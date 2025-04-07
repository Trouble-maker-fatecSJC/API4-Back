import { AppDataSource } from "../config/database";
import { Usuario } from "../models/usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UsuarioService {
  async cadastrar(dados: Usuario) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);

    // // Validar CPF (agora como string)
    if (!this.validarCpf(dados.cpf)) throw new Error("CPF inválido");

    // Verificar se o email já existe
    const emailExiste = await usuarioRepository.findOne({ where: { email: dados.email } });
    if (emailExiste) throw new Error("Email já cadastrado");

    // Criptografar senha
    dados.senha = await this.criptografarSenha(dados.senha);

    // Salvar usuário
    return await usuarioRepository.save(dados);
  }

  async buscarPorCpf(cpf: string) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    return await usuarioRepository.findOne({ where: { cpf } }); // CPF agora é string
  }

  async buscarTodos() {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    return await usuarioRepository.find();
  }

  async atualizar(cpf: string, dados: Partial<Usuario>) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);

    console.log("Recebendo atualização para CPF:", cpf);
    console.log("Dados recebidos para atualização:", dados);

    // Verifica se o usuário existe
    const usuarioExistente = await usuarioRepository.findOneBy({ cpf });
    if (!usuarioExistente) {
        throw new Error("Usuário não encontrado");
    }

    // Remove campos `undefined` para evitar problemas na atualização
    Object.keys(dados).forEach((key) => {
        if (dados[key as keyof Usuario] === undefined) {
            delete dados[key as keyof Usuario];
        }
    });

    console.log("Dados filtrados para atualização:", dados);

    // Atualiza o usuário
    await usuarioRepository.update({ cpf }, dados);

    // Retorna o usuário atualizado
    return await this.buscarPorCpf(cpf);
}

  async deletar(cpf: string) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    await usuarioRepository.delete({ cpf });
  }

  async login(email: string, senha: string) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      throw new Error("Credenciais inválidas");
    }

    return jwt.sign({ cpf: usuario.cpf }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  }

  validarCpf(cpf: string): boolean {
    // Remove qualquer caractere não numérico (já está fazendo isso corretamente)
    cpf = cpf.replace(/\D/g, "");
  
    // Verifica se o CPF possui 11 dígitos numéricos
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return false;
    }
  
    // Verifica se o CPF é uma sequência repetida de números, como "11111111111"
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Função que calcula e valida os dois dígitos verificadores do CPF
    const calcularDigitoVerificador = (cpf: string): boolean => {
      let soma = 0;
      let peso = 10;
      
      // Cálculo do primeiro dígito verificador
      for (let i = 0; i < 9; i++) {
        soma += Number(cpf.charAt(i)) * peso--;
      }
    
      let digito1 = 11 - (soma % 11);
      if (digito1 === 10 || digito1 === 11) digito1 = 0;
      if (digito1 !== Number(cpf.charAt(9))) return false;
    
      soma = 0;
      peso = 11;
    
      // Cálculo do segundo dígito verificador
      for (let i = 0; i < 10; i++) {
        soma += Number(cpf.charAt(i)) * peso--;
      }
    
      let digito2 = 11 - (soma % 11);
      if (digito2 === 10 || digito2 === 11) digito2 = 0;
    
      return digito2 === Number(cpf.charAt(10));
    };
  
    return calcularDigitoVerificador(cpf);
  }

  async criptografarSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(senha, salt);
  }

  async verificarTipoUsuario(tipo: number): Promise<string> {
    if (tipo === 1) {
        return "Usuário é um administrador";
    } else if (tipo === 2) {
        return "Usuário é um usuário comum";
    } else {
        throw new Error("Tipo de usuário inválido");
    }
  }

  async buscarPorEmail(email: string) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    return await usuarioRepository.findOne({ where: { email } });
}

}

export default new UsuarioService();
