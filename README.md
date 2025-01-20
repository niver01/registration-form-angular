# **Formulario de Registro - Implementación en Angular**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Enlace de página

[Ir al enlace](https://678d735504bb72a99309b39d--incomparable-naiad-778dbd.netlify.app/)

# **Reporte de Accesibilidad - Cumplimiento de WCAG 2.1**

### **1. Principio: Perceptible**

- **Etiquetas accesibles:** Uso de `<label>` asociado a los campos mediante `for` y `formControlName`.
- **Mensajes de error accesibles:** Implementados con `aria-describedby` y anunciados dinámicamente con `aria-live="polite"`.
- **Contraste:** Verificado con herramientas para cumplir con WCAG AA.

### **2. Principio: Operable**

- **Navegación por teclado:** Fluida y con orden lógico gracias a `[appFocusNext]`.
- **Retroalimentación visual:** Errores destacados mediante `is-invalid` y mensajes claros.

### **3. Principio: Comprensible**

- **Validaciones en tiempo real:** Mensajes claros y criterios específicos visibles (e.g., requisitos de contraseña).
- **Semántica clara:** Uso de `<fieldset>` y `<legend>` para agrupar campos relacionados.

### **4. Principio: Robusto**

- **Compatibilidad:** Con **NVDA** y herramientas como **WAVE** y **Lighthouse**.
- **HTML semántico:** Uso de etiquetas estándar y atributos ARIA (`aria-describedby`, `aria-invalid`, `aria-live`).

### **Resultados de Pruebas**

- **Herramientas utilizadas:**
  - **WAVE:** Sin errores críticos.
  - **Lighthouse:** Cumple con WCAG 2.1 AA.

### **Conclusión**

La solución cumple con los estándares **WCAG 2.1 AA**, garantizando una experiencia accesible, clara y robusta para todos los usuarios.

![alt text](image.png)
