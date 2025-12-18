// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../api";

function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // DTO'da email zorunlu
    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            // api.js'e eklediğimiz fonksiyonu çağırıyoruz
            await registerRequest(username, email, password);

            setSuccess(true);
            // 2 saniye sonra login sayfasına yönlendir
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.error(err);
            // Backend'den gelen hatayı yakalamaya çalışalım
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Kayıt başarısız. Bilgileri kontrol edin.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-layout">
            <div className="login-panel">
                <div className="login-header">
                    <h1 className="login-title">MyTasks - Kayıt Ol</h1>
                    <p className="login-subtitle">
                        Projelerini yönetmeye başlamak için hemen hesabını oluştur.
                    </p>
                </div>

                {success ? (
                    <div style={{ textAlign: "center", color: "#4ade80", padding: "20px" }}>
                        <h3>Kaydın Başarıyla Oluşturuldu! 🎉</h3>
                        <p>Giriş sayfasına yönlendiriliyorsun...</p>
                    </div>
                ) : (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label className="login-label">Kullanıcı adı</label>
                            <input
                                className="login-input"
                                type="text"
                                placeholder="örn. yeniuye"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength={3}
                            />
                        </div>

                        <div className="login-field">
                            <label className="login-label">E-posta</label>
                            <input
                                className="login-input"
                                type="email"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label className="login-label">Şifre</label>
                            <input
                                className="login-input"
                                type="password"
                                placeholder="En az 6 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        {error && <p className="login-error">{error}</p>}

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={submitting}
                            >
                                {submitting ? "Kaydediliyor..." : "Kayıt Ol"}
                            </button>

                            <button
                                type="button"
                                className="login-register-btn"
                                onClick={() => navigate("/login")}
                            >
                                Zaten hesabın var mı? Giriş Yap
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RegisterPage;