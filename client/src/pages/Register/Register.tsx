import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation"
import { registerUser } from "../../utils/api";
import Logo from "../../assets/Logo.png";

export default function Register() {

    function getNavLinkClass({ isActive }: { isActive: boolean }) {
        return isActive
            ? "form__nav-link form__nav-link_active"
             : "form__nav-link";
    }

    const { values, errors, isValid, handleChange } = useFormWithValidation();

    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        if (!isValid) return;
        try {
            await registerUser(values.name, values.email, values.password);
            navigate('/login');
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
        }
    }

    return <div className="register">
        <header className="header">
            <img className="header__logo" alt="MeshAI logo" src={Logo} />
        </header>
        <form className="form" onSubmit={handleSubmit} noValidate>
            <h1 className="form__title">Create account</h1>
            <p className="form__description">Access your organisation's secure workspace</p>
            <nav className="form__nav">
                <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
                <NavLink to="/register" className={getNavLinkClass}>Register</NavLink>
            </nav>
            <div className="form__input-container">
                <label className="form__label">
                    Name
                    <input
                        name="name"
                        className="form__input"
                        type="text"
                        required
                        minLength={2}
                        maxLength={40}
                        value={values.name ?? ''}
                        onChange={handleChange}
                    />
                </label>
                 {errors.name && <p className="form__error">{errors.name}</p>}
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
            Create account
            </button>
            {submitError && <p className="form__error">{submitError}</p>}
        </form>    
    </div>
}