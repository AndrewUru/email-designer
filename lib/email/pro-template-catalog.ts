export interface ProTemplateItem {
  id: string;
  name: string;
  description: string;
  mjml: string;
}

export const proTemplateCatalog: ProTemplateItem[] = [
  {
    id: "welcome-onboarding",
    name: "Welcome + Onboarding",
    description: "Template de bienvenida para activar usuarios nuevos en SaaS.",
    mjml: `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" />
      <mj-text color="#334155" font-size="16px" line-height="1.6" />
      <mj-button background-color="#0F172A" color="#FFFFFF" border-radius="8px" font-size="15px" font-weight="600" padding="14px 32px" />
      <mj-section padding="0" />
      <mj-column padding="0" />
    </mj-attributes>
    <mj-style>
      .step-number {
        display: inline-block;
        background: #0F172A;
        color: #FFFFFF;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 12px;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#F1F5F9" width="600px">
    
    <!-- Header espaciado -->
    <mj-section padding="40px 0 0" background-color="transparent">
      <mj-column>
        <mj-text align="center" font-size="13px" color="#64748B" padding="0">
          ACME STUDIO
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero Section -->
    <mj-section background-color="#FFFFFF" padding="48px 40px 32px" border-radius="12px 12px 0 0">
      <mj-column>
        <mj-text font-size="32px" font-weight="700" line-height="1.2" color="#0F172A" padding="0 0 16px" align="center">
          ¡Bienvenido a Acme Studio! 🎉
        </mj-text>
        <mj-text font-size="17px" color="#64748B" padding="0 0 32px" align="center" line-height="1.5">
          Hola <strong>{{first_name}}</strong>, estamos emocionados de tenerte aquí. En menos de 5 minutos puedes tener tu primer proyecto listo.
        </mj-text>
        <mj-button href="https://example.com/app" padding="0 0 8px" inner-padding="16px 40px">
          Entrar al dashboard →
        </mj-button>
        <mj-text font-size="13px" color="#94A3B8" padding="12px 0 0" align="center">
          o copia este enlace: <a href="https://example.com/app" style="color: #0F172A; text-decoration: underline;">example.com/app</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Divider -->
    <mj-section background-color="#FFFFFF" padding="0 40px">
      <mj-column>
        <mj-divider border-color="#E2E8F0" border-width="1px" padding="0" />
      </mj-column>
    </mj-section>

    <!-- Getting Started Section -->
    <mj-section background-color="#FFFFFF" padding="32px 40px 16px">
      <mj-column>
        <mj-text font-size="20px" font-weight="700" color="#0F172A" padding="0 0 8px">
          Primeros pasos
        </mj-text>
        <mj-text font-size="15px" color="#64748B" padding="0 0 24px">
          Sigue estos pasos para empezar a aprovechar todo el potencial de la plataforma:
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 1 -->
    <mj-section background-color="#FFFFFF" padding="0 40px 24px">
      <mj-column width="60px" vertical-align="top">
        <mj-text padding="4px 0 0" align="center">
          <span class="step-number">1</span>
        </mj-text>
      </mj-column>
      <mj-column width="540px" vertical-align="top">
        <mj-text font-size="16px" font-weight="600" color="#0F172A" padding="0 0 6px">
          Conecta tu dominio
        </mj-text>
        <mj-text font-size="15px" color="#64748B" padding="0">
          Configura tu remitente personalizado para mejorar la entregabilidad de tus correos.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 2 -->
    <mj-section background-color="#FFFFFF" padding="0 40px 24px">
      <mj-column width="60px" vertical-align="top">
        <mj-text padding="4px 0 0" align="center">
          <span class="step-number">2</span>
        </mj-text>
      </mj-column>
      <mj-column width="540px" vertical-align="top">
        <mj-text font-size="16px" font-weight="600" color="#0F172A" padding="0 0 6px">
          Importa tus contactos
        </mj-text>
        <mj-text font-size="15px" color="#64748B" padding="0">
          Sube tu lista de contactos en CSV o conéctala directamente desde tu CRM.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Step 3 -->
    <mj-section background-color="#FFFFFF" padding="0 40px 32px">
      <mj-column width="60px" vertical-align="top">
        <mj-text padding="4px 0 0" align="center">
          <span class="step-number">3</span>
        </mj-text>
      </mj-column>
      <mj-column width="540px" vertical-align="top">
        <mj-text font-size="16px" font-weight="600" color="#0F172A" padding="0 0 6px">
          Crea tu primera campaña
        </mj-text>
        <mj-text font-size="15px" color="#64748B" padding="0">
          Usa nuestras plantillas prediseñadas o crea la tuya desde cero.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Help Section -->
    <mj-section background-color="#F8FAFC" padding="28px 40px" border-radius="0 0 12px 12px">
      <mj-column width="10%" vertical-align="middle">
        <mj-text font-size="24px" padding="0" align="center">💬</mj-text>
      </mj-column>
      <mj-column width="90%" vertical-align="middle">
        <mj-text font-size="14px" color="#475569" padding="0" line-height="1.5">
          <strong>¿Necesitas ayuda?</strong> Responde este email y nuestro equipo te acompañará en el proceso. Estamos aquí para ti.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section padding="32px 40px" background-color="transparent">
      <mj-column>
        <mj-text font-size="13px" color="#94A3B8" align="center" padding="0 0 8px">
          © 2025 Acme Studio. Todos los derechos reservados.
        </mj-text>
        <mj-text font-size="13px" color="#94A3B8" align="center" padding="0">
          <a href="#" style="color: #64748B; text-decoration: none; margin: 0 8px;">Preferencias</a> · 
          <a href="#" style="color: #64748B; text-decoration: none; margin: 0 8px;">Cancelar suscripción</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`.trim(),
  },
  {
    id: "ecommerce-flash-sale",
    name: "Ecommerce Flash Sale",
    description:
      "Template promo para descuentos con llamada de accion principal.",
    mjml: `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" />
      <mj-section padding="0" />
      <mj-column padding="0" />
      <mj-text color="#1F2937" line-height="1.5" />
    </mj-attributes>
    <mj-style>
      .countdown {
        background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
        border-radius: 8px;
        padding: 8px 16px;
        display: inline-block;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 1px;
      }
      .badge {
        background: #DC2626;
        color: #FFFFFF;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 700;
        display: inline-block;
        letter-spacing: 0.5px;
      }
      .benefit-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: #FEF3C7;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        margin-bottom: 12px;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#FFFBEB" width="600px">
    
    <!-- Top Banner con urgencia -->
    <mj-section background-color="#DC2626" padding="14px 24px">
      <mj-column>
        <mj-text align="center" color="#FFFFFF" font-size="13px" font-weight="700" padding="0" letter-spacing="1px">
          ⚡ FLASH SALE • SOLO HOY • HASTA 40% OFF EN TODO ⚡
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Countdown Timer -->
    <mj-section background-color="#FFFFFF" padding="24px 32px 0" border-radius="16px 16px 0 0">
      <mj-column>
        <mj-text align="center" font-size="14px" color="#6B7280" padding="0 0 12px" font-weight="600">
          LA OFERTA TERMINA EN:
        </mj-text>
        <mj-text align="center" padding="0 0 24px">
          <span class="countdown">23:45:12</span>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Hero Image con badge -->
    <mj-section background-color="#FFFFFF" padding="0 32px 20px">
      <mj-column>
        <mj-text align="center" padding="0 0 12px">
          <span class="badge">HASTA -40%</span>
        </mj-text>
        <mj-image
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
          alt="Colección destacada"
          width="536px"
          padding="0"
          border-radius="12px"
        />
      </mj-column>
    </mj-section>

    <!-- Main Content -->
    <mj-section background-color="#FFFFFF" padding="8px 32px 28px">
      <mj-column>
        <mj-text font-size="36px" font-weight="800" align="center" padding="0 0 12px" color="#111827" line-height="1.1">
          Rebajas de Temporada
        </mj-text>
        <mj-text align="center" font-size="18px" padding="0 0 8px" color="#4B5563" line-height="1.6">
          Renueva tu look con precios especiales
        </mj-text>
        <mj-text align="center" font-size="15px" padding="0 0 24px" color="#9CA3AF" font-weight="600">
          Stock limitado • Se aplican términos y condiciones
        </mj-text>
        <mj-button
          href="https://example.com/sale"
          align="center"
          background-color="#DC2626"
          color="#FFFFFF"
          font-size="17px"
          font-weight="700"
          border-radius="999px"
          inner-padding="16px 48px"
        >
          Comprar ahora →
        </mj-button>
        <mj-text align="center" font-size="13px" color="#9CA3AF" padding="12px 0 0">
          Envío gratis en compras sobre $50
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Divider -->
    <mj-section background-color="#FFFFFF" padding="0 32px">
      <mj-column>
        <mj-divider border-color="#F3F4F6" border-width="1px" padding="0" />
      </mj-column>
    </mj-section>

    <!-- Benefits Section -->
    <mj-section background-color="#FFFFFF" padding="28px 32px 32px">
      <mj-column width="33.33%" vertical-align="top">
        <mj-text align="center" padding="0">
          <span class="benefit-icon">🚀</span>
        </mj-text>
        <mj-text font-size="15px" font-weight="700" align="center" padding="0 0 6px" color="#111827">
          Envío rápido
        </mj-text>
        <mj-text font-size="14px" align="center" padding="0" color="#6B7280">
          Despacho en 24-48h
        </mj-text>
      </mj-column>
      <mj-column width="33.33%" vertical-align="top">
        <mj-text align="center" padding="0">
          <span class="benefit-icon">🔄</span>
        </mj-text>
        <mj-text font-size="15px" font-weight="700" align="center" padding="0 0 6px" color="#111827">
          Cambios gratis
        </mj-text>
        <mj-text font-size="14px" align="center" padding="0" color="#6B7280">
          Hasta 30 días
        </mj-text>
      </mj-column>
      <mj-column width="33.33%" vertical-align="top">
        <mj-text align="center" padding="0">
          <span class="benefit-icon">🔒</span>
        </mj-text>
        <mj-text font-size="15px" font-weight="700" align="center" padding="0 0 6px" color="#111827">
          Pago seguro
        </mj-text>
        <mj-text font-size="14px" align="center" padding="0" color="#6B7280">
          Encriptación SSL
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Social Proof -->
    <mj-section background-color="#FEF3C7" padding="24px 32px" border-radius="0 0 16px 16px">
      <mj-column>
        <mj-text align="center" font-size="14px" color="#92400E" padding="0" line-height="1.6">
          ⭐⭐⭐⭐⭐ <strong>Más de 10,000 clientes satisfechos</strong> han aprovechado nuestras ofertas este mes
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- CTA alternativo -->
    <mj-section background-color="transparent" padding="24px 32px 16px">
      <mj-column>
        <mj-text align="center" font-size="15px" color="#6B7280" padding="0">
          ¿No es para ti? 
          <a href="https://example.com/shop" style="color: #DC2626; font-weight: 600; text-decoration: none;">Ver toda la tienda →</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section padding="20px 32px 32px" background-color="transparent">
      <mj-column>
        <mj-text font-size="12px" color="#9CA3AF" align="center" padding="0 0 8px" line-height="1.5">
          Has recibido este email porque estás suscrito a nuestras ofertas especiales.
        </mj-text>
        <mj-text font-size="12px" color="#9CA3AF" align="center" padding="0">
          <a href="#" style="color: #6B7280; text-decoration: none; margin: 0 8px;">Ver en navegador</a> · 
          <a href="#" style="color: #6B7280; text-decoration: none; margin: 0 8px;">Cancelar suscripción</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`.trim(),
  },
  {
    id: "newsletter-weekly",
    name: "Newsletter Weekly Brief",
    description: "Resumen semanal con varios bloques de contenido editorial.",
    mjml: `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" />
      <mj-section padding="0" />
      <mj-column padding="0" />
      <mj-text color="#334155" line-height="1.6" />
    </mj-attributes>
    <mj-style>
      .category-tag {
        display: inline-block;
        background: #F1F5F9;
        color: #475569;
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 10px;
      }
      .product-tag { background: #DBEAFE; color: #1E40AF; }
      .marketing-tag { background: #FCE7F3; color: #BE185D; }
      .ops-tag { background: #D1FAE5; color: #065F46; }
      .read-more {
        color: #0F172A;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
      }
      .read-more:hover {
        text-decoration: underline;
      }
      .issue-number {
        background: #FCD34D;
        color: #78350F;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        display: inline-block;
        letter-spacing: 0.5px;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#F8FAFC" width="640px">
    
    <!-- Spacer -->
    <mj-section background-color="transparent" padding="32px 0 0">
      <mj-column></mj-column>
    </mj-section>

    <!-- Header -->
    <mj-section background-color="#0F172A" padding="40px 36px 36px" border-radius="16px 16px 0 0">
      <mj-column>
        <mj-text color="#94A3B8" font-size="13px" font-weight="600" padding="0 0 8px" letter-spacing="1px">
          <span class="issue-number">EDICIÓN #47</span>
        </mj-text>
        <mj-text color="#F8FAFC" font-size="32px" font-weight="800" padding="0 0 12px" line-height="1.2">
          Weekly Brief
        </mj-text>
        <mj-text color="#CBD5E1" font-size="16px" padding="0 0 20px" line-height="1.5">
          Lo más importante de producto, growth y operaciones esta semana.
        </mj-text>
        <mj-text color="#94A3B8" font-size="13px" padding="0">
          📅 Semana del 10-16 Febrero, 2025
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Main Content -->
    <mj-section background-color="#FFFFFF" padding="36px 36px 12px">
      <mj-column>
        <!-- Article 1 -->
        <mj-text padding="0 0 12px">
          <span class="category-tag product-tag">💡 PRODUCTO</span>
        </mj-text>
        <mj-text font-size="20px" font-weight="700" padding="0 0 10px" color="#0F172A" line-height="1.3">
          Nuevo editor de bloques con guardado automático
        </mj-text>
        <mj-text font-size="15px" line-height="1.7" padding="0 0 10px" color="#475569">
          Lanzamos el editor de bloques completamente rediseñado con soporte para guardado automático y preview instantáneo. Los usuarios pueden ver cambios en tiempo real sin necesidad de refrescar.
        </mj:text>
        <mj-text padding="0 0 28px">
          <a href="https://example.com/article-1" class="read-more">Leer más →</a>
        </mj-text>
        
        <mj-divider border-width="1px" border-color="#E2E8F0" padding="0 0 28px" />

        <!-- Article 2 -->
        <mj-text padding="0 0 12px">
          <span class="category-tag marketing-tag">📈 MARKETING</span>
        </mj-text>
        <mj-text font-size="20px" font-weight="700" padding="0 0 10px" color="#0F172A" line-height="1.3">
          Beta de onboarding para reducir churn temprano
        </mj-text>
        <mj-text font-size="15px" line-height="1.7" padding="0 0 10px" color="#475569">
          Abrimos la beta de la nueva secuencia de onboarding diseñada para reducir el churn en el primer mes. Los primeros resultados muestran un 23% de mejora en retención.
        </mj-text>
        <mj-text padding="0 0 28px">
          <a href="https://example.com/article-2" class="read-more">Leer más →</a>
        </mj-text>
        
        <mj-divider border-width="1px" border-color="#E2E8F0" padding="0 0 28px" />

        <!-- Article 3 -->
        <mj-text padding="0 0 12px">
          <span class="category-tag ops-tag">⚙️ OPERACIONES</span>
        </mj-text>
        <mj-text font-size="20px" font-weight="700" padding="0 0 10px" color="#0F172A" line-height="1.3">
          Optimización del pipeline: latencia bajo 400ms
        </mj-text>
        <mj-text font-size="15px" line-height="1.7" padding="0 0 10px" color="#475569">
          El equipo de Ops optimizó el pipeline de render y logró reducir la latencia de preview por debajo de 400ms, mejorando significativamente la experiencia de usuario.
        </mj-text>
        <mj-text padding="0 0 12px">
          <a href="https://example.com/article-3" class="read-more">Leer más →</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Stats Section -->
    <mj-section background-color="#FFFFFF" padding="24px 36px 32px">
      <mj-column>
        <mj-divider border-width="1px" border-color="#E2E8F0" padding="0 0 24px" />
        <mj-text font-size="14px" font-weight="700" padding="0 0 16px" color="#0F172A" letter-spacing="0.5px">
          📊 MÉTRICAS DE LA SEMANA
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#FFFFFF" padding="0 36px 36px">
      <mj-column width="33.33%" vertical-align="top">
        <mj-text font-size="28px" font-weight="800" padding="0 0 4px" color="#0F172A" align="center">
          +12.4%
        </mj-text>
        <mj-text font-size="13px" color="#64748B" align="center" padding="0">
          Nuevos usuarios
        </mj-text>
      </mj-column>
      <mj-column width="33.33%" vertical-align="top">
        <mj-text font-size="28px" font-weight="800" padding="0 0 4px" color="#0F172A" align="center">
          1.2M
        </mj-text>
        <mj-text font-size="13px" color="#64748B" align="center" padding="0">
          Emails enviados
        </mj-text>
      </mj-column>
      <mj-column width="33.33%" vertical-align="top">
        <mj-text font-size="28px" font-weight="800" padding="0 0 4px" color="#0F172A" align="center">
          98.7%
        </mj-text>
        <mj-text font-size="13px" color="#64748B" align="center" padding="0">
          Uptime
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Highlight Section -->
    <mj-section background-color="#FEF3C7" padding="24px 36px" border-radius="0 0 16px 16px">
      <mj-column width="10%" vertical-align="middle">
        <mj-text font-size="24px" padding="0" align="center">🎯</mj-text>
      </mj-column>
      <mj-column width="90%" vertical-align="middle">
        <mj-text font-size="14px" color="#78350F" padding="0" line-height="1.6">
          <strong>Próxima semana:</strong> Lanzamiento público del sistema de templates v2 y webinar de capacitación para el equipo.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Quick Links -->
    <mj-section background-color="transparent" padding="28px 36px 20px">
      <mj-column>
        <mj-text font-size="13px" color="#64748B" align="center" padding="0 0 12px" font-weight="600">
          ENLACES RÁPIDOS
        </mj-text>
        <mj-text font-size="14px" align="center" padding="0">
          <a href="#" style="color: #475569; text-decoration: none; margin: 0 12px;">📚 Docs</a>
          <a href="#" style="color: #475569; text-decoration: none; margin: 0 12px;">💬 Slack</a>
          <a href="#" style="color: #475569; text-decoration: none; margin: 0 12px;">📊 Dashboard</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section padding="20px 36px 40px" background-color="transparent">
      <mj-column>
        <mj-text font-size="12px" color="#94A3B8" align="center" padding="0 0 8px" line-height="1.6">
          Recibes este email porque estás suscrito al newsletter interno de la compañía.
        </mj-text>
        <mj-text font-size="12px" color="#94A3B8" align="center" padding="0">
          <a href="#" style="color: #64748B; text-decoration: none; margin: 0 8px;">Ver en navegador</a> · 
          <a href="#" style="color: #64748B; text-decoration: none; margin: 0 8px;">Archivo</a> · 
          <a href="#" style="color: #64748B; text-decoration: none; margin: 0 8px;">Preferencias</a>
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>`.trim(),
  },
];
