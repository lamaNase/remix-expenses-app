import { Form, Link, useActionData, useNavigate, useNavigation, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  
  const submitBtnCaption = mode === 'login'? 'Login': 'Sign up';
  const tuggleBtnCaption = mode === 'signup'? 'Log in with existing user': 'Create a New User';
  const error = useActionData();
  const isSubmitting = useNavigation().state !== "idle";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img" onClick={()=> console.log("sfdfsdfsdfsdf")
      }>
        {mode === 'login'? <FaLock />: < FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email"/>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"/>
      </p>
      {error && <ul>
        {Object.values(error).map(err => <li key={err}>
          {err}
        </li>)}  
      </ul>}
      <div className="form-actions">
        <button disabled={isSubmitting}>{submitBtnCaption}</button>
        <Link to={mode === 'login'? '?mode=signup': '?mode=login'}>{tuggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;