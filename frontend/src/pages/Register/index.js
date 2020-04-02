import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAlert } from 'react-alert';

import api from '../../services/api';
import { authenticate, deauthenticate } from '../../auth';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  deauthenticate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();
  const alert = useAlert();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      id: id.toLowerCase(),
      password,
      name,
      email,
      whatsapp: `55${whatsapp}`,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);

      authenticate(response);
      history.push('/profile');
    } catch (err) {
      if (err.response.status === 400) {
        alert.show('Por favor, verifique todos os dados do formulário e tente novamente.');
      } else {
        alert.error('Erro no cadastro, tente novamente mais tarde.');
      }
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>

          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua
            ONG.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="text"
              placeholder="UF"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
