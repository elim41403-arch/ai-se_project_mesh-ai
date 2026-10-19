import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation"
import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "../../utils/api";
import Logo from "../../assets/Logo.png"

export default function Login() {

    function getNavLinkClass({ isActive }: { isActive: boolean }) {
        return isActive
            ? "form__nav-link form__nav-link_active"
             : "form__nav-link";
    }

    const { values, errors, isValid, handleChange } = useFormWithValidation();

    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!isValid) return;
        try {
            const res = await loginUser(values.email, values.password);
            if (res.data) {
                const { token, user } = res.data;
                login(token, user);
                navigate('/knowledge');
            }
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
        }
    }

    return <div className="login">
        <header className="header">
            <img className="header__logo" alt="MeshAI logo" src={Logo} />
        </header>
        <form className="form" onSubmit={handleSubmit} noValidate>
            <h1 className="form__title">Sign in</h1>
            <p className="form__description">Access your organisation's secure workspace</p>
            <nav className="form__nav">
                <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
                <NavLink to="/register" className={getNavLinkClass}>Register</NavLink>
            </nav>
            <div className="form__input-container">
                <label className="form__label">
                    Email
                    <input
                        name="email"
                        className="form__input"
                        type="email"
                        required
                        value={values.email ?? ''}
                        onChange={handleChange}
                    />
                </label>
                {errors.email && <p className="form__error">{errors.email}</p>}
                <label className="form__label">
                    Password
                    <input
                        name="password"
                        className="form__input"
                        type="password"
                        required
                        minLength={8}
                        onChange={handleChange}
                    />
                </label>
                {errors.password && <p className="form__error">{errors.password}</p>}

            </div>    
            <button
                type="submit"
                className="form__submit-btn"
                disabled={!isValid}
            >
            Login
            </button>
            {submitError && <p className="form__error">{submitError}</p>}
        </form>    
    </div>
}