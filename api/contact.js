export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { nombre, email, telefono, departamento, mensaje, lang, _honey } = req.body || {};

  // Filtro anti-spam Honeypot
  if (_honey) {
    return res.status(200).json({ success: true, message: 'OK' });
  }

  // Validación básica
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.resend_ap1_key || process.env.resend_api_key;
  if (!apiKey) {
    console.error('RESEND_API_KEY o resend_ap1_key no está configurada en las variables de entorno de Vercel');
    return res.status(500).json({ success: false, message: 'Error de configuración del servidor' });
  }

  // Detección de idioma (por parámetro explícito 'lang' o por encabezado 'referer')
  const referer = (req.headers && (req.headers['referer'] || req.headers['referrer'])) || '';
  const detectedLang = lang 
    ? String(lang).toLowerCase() 
    : (referer.includes('/en/') || referer.includes('/en') ? 'en' : 'es');
  const isEn = detectedLang === 'en';

  const defaultDept = isEn ? 'General Enquiry' : 'Consulta General';
  const deptLabel = departamento || defaultDept;
  const userPhone = telefono || (isEn ? 'Not provided' : 'No facilitado');
  const siteUrl = 'https://gruposerinamar.com';

  // 1. PLANTILLA HTML EN ESPAÑOL
  const clientHtmlEs = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Grupo Serinamar · Confirmación de Consulta</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color:#132238;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FAF8F5; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Contenedor Principal -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#ffffff; border:1px solid #EAE3D9; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(19,34,56,0.05);">
          
          <!-- Cabecera Corporativa Azul Marino -->
          <tr>
            <td align="center" style="background-color:#132238; padding: 36px 30px 28px 30px; border-bottom: 3px solid #C5A880;">
              <img src="${siteUrl}/images/logos/serinamar-logo.png" alt="Grupo Serinamar" style="max-height: 52px; width: auto; display: block; filter: brightness(0) invert(1);" />
              <p style="margin: 12px 0 0 0; color: #C5A880; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600;">
                Marbella · Puerto Banús · Desde 2000
              </p>
            </td>
          </tr>

          <!-- Cuerpo del Mensaje -->
          <tr>
            <td style="padding: 36px 40px 30px 40px;">
              <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.6; color: #132238; font-weight: 600;">
                Estimado/a ${nombre},
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: #4B5563;">
                Le confirmamos que hemos recibido correctamente su solicitud de información a través de nuestro portal web. Nuestro equipo en Los Naranjos de Marbella revisará su consulta y se pondrá en contacto con usted a la mayor brevedad.
              </p>

              <!-- Tarjeta de Resumen -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 8px; margin: 24px 0; padding: 18px 22px;">
                <tr>
                  <td style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A704C; font-weight: 700; padding-bottom: 8px;">
                    Detalles de su solicitud
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 4px 0;">
                    <strong>Departamento de interés:</strong> ${deptLabel}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 4px 0;">
                    <strong>Teléfono indicado:</strong> ${userPhone}
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.7; color: #4B5563;">
                Si precisa de atención inmediata o desea ampliar algún detalle de forma directa, estamos a su disposición en nuestra oficina y recepción:
              </p>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 3px 0;">
                    · Centralita de recepción: <strong>+34 952 81 33 62</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 3px 0;">
                    · Atención multilingüe y WhatsApp: <strong>+34 951 79 49 31</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 3px 0;">
                    · Correo electrónico: <strong>info@serinamar.com</strong>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #132238;">
                Atentamente,<br />
                <strong>Equipo de Atención al Cliente</strong><br />
                <span style="color: #8A704C; font-size: 13px;">Solutions Serinamar S.L.</span>
              </p>
            </td>
          </tr>

          <!-- Pie de Firma Institucional -->
          <tr>
            <td style="background-color: #F4EFE6; padding: 22px 40px; border-top: 1px solid #EAE3D9; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #6B7280; line-height: 1.5;">
                Urb. Los Naranjos de Marbella · Centro Comercial, Local 5 · 29660 Marbella, Málaga
              </p>
              <p style="margin: 0; font-size: 11px; color: #9CA3AF;">
                © ${new Date().getFullYear()} Grupo Serinamar. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  // 2. PLANTILLA HTML EN INGLÉS
  const clientHtmlEn = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Grupo Serinamar · Enquiry Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color:#132238;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FAF8F5; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Contenedor Principal -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#ffffff; border:1px solid #EAE3D9; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(19,34,56,0.05);">
          
          <!-- Cabecera Corporativa Azul Marino -->
          <tr>
            <td align="center" style="background-color:#132238; padding: 36px 30px 28px 30px; border-bottom: 3px solid #C5A880;">
              <img src="${siteUrl}/images/logos/serinamar-logo.png" alt="Grupo Serinamar" style="max-height: 52px; width: auto; display: block; filter: brightness(0) invert(1);" />
              <p style="margin: 12px 0 0 0; color: #C5A880; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600;">
                Marbella · Puerto Banús · Since 2000
              </p>
            </td>
          </tr>

          <!-- Cuerpo del Mensaje -->
          <tr>
            <td style="padding: 36px 40px 30px 40px;">
              <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.6; color: #132238; font-weight: 600;">
                Dear ${nombre},
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: #4B5563;">
                Thank you for contacting Grupo Serinamar. We confirm that we have safely received your enquiry through our website. Our team at Los Naranjos de Marbella is reviewing your request and will get back to you shortly.
              </p>

              <!-- Tarjeta de Resumen -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 8px; margin: 24px 0; padding: 18px 22px;">
                <tr>
                  <td style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A704C; font-weight: 700; padding-bottom: 8px;">
                    Enquiry Details
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 4px 0;">
                    <strong>Department / Service:</strong> ${deptLabel}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 4px 0;">
                    <strong>Contact telephone:</strong> ${userPhone}
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.7; color: #4B5563;">
                Should you require immediate assistance or wish to speak with our team directly, our reception desk and multilingual advisors are at your service:
              </p>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 3px 0;">
                    · Main Reception Desk: <strong>+34 952 81 33 62</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 3px 0;">
                    · Multilingual Support & WhatsApp: <strong>+34 951 79 49 31</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #132238; padding: 3px 0;">
                    · Email address: <strong>info@serinamar.com</strong>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #132238;">
                Kind regards,<br />
                <strong>Customer Care Team</strong><br />
                <span style="color: #8A704C; font-size: 13px;">Solutions Serinamar S.L.</span>
              </p>
            </td>
          </tr>

          <!-- Pie de Firma Institucional -->
          <tr>
            <td style="background-color: #F4EFE6; padding: 22px 40px; border-top: 1px solid #EAE3D9; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #6B7280; line-height: 1.5;">
                Urb. Los Naranjos de Marbella · Centro Comercial, Local 5 · 29660 Marbella, Spain
              </p>
              <p style="margin: 0; font-size: 11px; color: #9CA3AF;">
                © ${new Date().getFullYear()} Grupo Serinamar. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  // 3. PLANTILLA HTML PARA LA EMPRESA (info@serinamar.com)
  const staffHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif; color:#132238; padding:20px;">
  <h2 style="color:#132238; border-bottom:2px solid #C5A880; padding-bottom:8px;">Nueva consulta recibida desde la web (${isEn ? 'Página en INGLÉS' : 'Página en ESPAÑOL'})</h2>
  <table style="width:100%; max-width:600px; border-collapse:collapse; margin-top:16px;">
    <tr><td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold; width:180px;">Idioma de origen:</td><td style="padding:8px; border-bottom:1px solid #ddd; color:#8A704C; font-weight:bold;">${isEn ? 'Inglés (English)' : 'Español'}</td></tr>
    <tr><td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">Nombre:</td><td style="padding:8px; border-bottom:1px solid #ddd;">${nombre}</td></tr>
    <tr><td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">Email del cliente:</td><td style="padding:8px; border-bottom:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">Teléfono:</td><td style="padding:8px; border-bottom:1px solid #ddd;">${userPhone}</td></tr>
    <tr><td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">Departamento / Asunto:</td><td style="padding:8px; border-bottom:1px solid #ddd;">${deptLabel}</td></tr>
    <tr><td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">Mensaje:</td><td style="padding:8px; border-bottom:1px solid #ddd; white-space:pre-wrap;">${mensaje}</td></tr>
  </table>
  <p style="margin-top:20px; font-size:12px; color:#666;">Puedes responder directamente a este correo para escribir al cliente.</p>
</body>
</html>
`;

  const clientSubject = isEn
    ? 'We have received your enquiry · Grupo Serinamar'
    : 'Hemos recibido su consulta · Grupo Serinamar';

  const staffSubject = isEn
    ? `Nueva consulta [EN]: ${deptLabel} - ${nombre}`
    : `Nueva consulta: ${deptLabel} - ${nombre}`;

  try {
    // A) Enviar notificación a la empresa (info@serinamar.com)
    const staffRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Grupo Serinamar Web <onboarding@resend.dev>',
        to: ['info@serinamar.com'],
        reply_to: email,
        subject: staffSubject,
        html: staffHtml
      })
    });

    // B) Enviar confirmación de alta gama al cliente en su idioma
    const clientRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Grupo Serinamar <onboarding@resend.dev>',
        to: [email],
        reply_to: 'info@serinamar.com',
        subject: clientSubject,
        html: isEn ? clientHtmlEn : clientHtmlEs
      })
    });

    if (!staffRes.ok && !clientRes.ok) {
      const errData = await staffRes.json().catch(() => ({}));
      console.error('Error en API Resend:', errData);
      return res.status(500).json({ success: false, message: 'No se pudo enviar mediante Resend' });
    }

    return res.status(200).json({ success: true, message: 'Mensajes enviados con éxito', lang: isEn ? 'en' : 'es' });
  } catch (error) {
    console.error('Excepción al conectar con Resend:', error);
    return res.status(500).json({ success: false, message: 'Error de conexión con el servicio de correo' });
  }
}
