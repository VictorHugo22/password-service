const express = require("express");
const app = express();

app.use(express.json()); // Permite procesar JSON en las solicitudes

// Ruta para validar contraseñas
app.post("/validate-password", (req, res) => {
  const { password } = req.body;

  // Reglas de validación
  const minLengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Verificar características de la contraseña
  const isValid =
    minLengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    symbolRegex.test(password);

  if (isValid) {
    res.status(200).json({ valid: true, message: "Contraseña válida." });
  } else {
    res.status(400).json({
      valid: false,
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
    });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});
