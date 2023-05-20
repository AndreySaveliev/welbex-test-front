import { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      api.register(email, name, password).then((res) => {
        api.login(email, password).then((res) => {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          navigate('/');
        });
      });
    } else {
      api
        .login(email, password)
        .then((res) => {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="w-full h-screen bg-gray-800 flex justify-center items-center flex-col ">
      <h1 className="font-bold text-xl">{isRegister ? 'Регистрация' : 'Войдите'}</h1>
      <form className="mx-auto  bg-blue-700 flex flex-col p-4" onSubmit={(e) => handleSubmit(e)}>
        {isRegister && (
          <>
            <label className="text-yellow-400">Name</label>
            <input
              className="p-2"
              type="text"
              min="2"
              max="30"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </>
        )}
        <label className="text-yellow-400">Email</label>
        <input
          className="p-2"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="text-yellow-400">Password</label>
        <input
          className="p-2"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="text-yellow-400 mt-2 border-2 rounded-sm" type="submit">
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <div className="w-[250px] text-center">
        <p>
          {isRegister ? 'Уже зарегистрировались?' : 'Нет аккаунта?'}
          <span
            onClick={() => {
              setIsRegister(!isRegister);
            }}
            className="cursor-pointer hover:opacity-70 text-yellow-400"
          >
            {isRegister ? 'Войдите с имеющимися данными!' : 'Зарегистрируйтесь!'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
