<template>
    <div class="landing-body">
        <loading-alert :display="displayLoading"></loading-alert>
        <menudigital-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></menudigital-alert>
        <!-- HERO SECTION -->
        <section class="hero">
            <nav>
                <div class="container">
                    <img
                        :src="require('@/assets/landing/logo.png')"
                        width="150px;"
                    />
                    <a
                        href="#subscribe"
                        class="float-right q-pt-md"
                        v-smooth-scroll
                        @click="logEntry('navbar', 'subscribe')"
                        >Suscríbete</a
                    >
                    <!-- <a href="#" class="float-right mr-3">como funciona</a>
                    <a href="#" class="float-right mr-3">caracteristicas</a>-->
                </div>
            </nav>
            <div class="container">
                <div clas="row">
                    <div class="col-lg-6 col-xs-12">
                        <h2 style="padding-top: 125px">
                            Menú en linea para tu negocio.
                        </h2>
                        <p class="pb-5 mt-5">
                            Recibe tus pedidos al instante y de forma organizada
                            directo en tu numero de WhatsApp o por correo y
                            gestionalos en tiempo real directo en Excel.
                        </p>
                        <a
                            href="#subscribe"
                            class="primary-cta mr-3 mb-3"
                            style="text-decoration: none"
                            v-smooth-scroll
                            @click="logEntry('hero', 'subscribe')"
                            >Suscríbete</a
                        >
                        <span v-if="$q.platform.is.mobile">
                            <br />
                            <br />
                            <br />
                        </span>
                        <a
                            href="#features"
                            class="secondary-cta mb-3"
                            style="text-decoration: none"
                            v-smooth-scroll
                            @click="logEntry('hero', 'reed more')"
                            >Leer Mas</a
                        >
                    </div>
                </div>
            </div>
        </section>
        <!-- END HERO SECTION -->

        <!-- FEATURES SECTION -->
        <section class="features" id="features">
            <div class="container">
                <div class="row">
                    <div
                        class="col-lg-3 col-sm-6 col-xs-12 mb-4"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        <i class="material-icons">layers</i>
                        <h3>estilo personalizable</h3>
                        <p>
                            Escoge con que colores deseas presentar tu menú para
                            brindarle a tus clientes una experiencia unificada
                            con tu estilo.
                        </p>
                    </div>
                    <div
                        class="col-lg-3 col-sm-6 col-xs-12 mb-4"
                        data-aos="fade-down"
                        data-aos-delay="200"
                    >
                        <i class="material-icons">smartphone</i>
                        <h3>Pedidos Por WhatsApp</h3>
                        <p>
                            Recibe toda la informacion de tus pedidos en un solo
                            mensaje directo a tu WhatsApp, con los detalles de
                            la orden, datos del cliente y ubicacion de entrega
                            con Google Maps o Waze.
                        </p>
                    </div>
                    <div
                        class="col-lg-3 col-sm-6 col-xs-12 mb-4"
                        data-aos="fade-down"
                        data-aos-delay="300"
                    >
                        <i class="material-icons">email</i>
                        <h3>Pedidos por Correo</h3>
                        <p>
                            Tambien puedes recibir los pedidos en tu direccion
                            de correo electronico si deseas tener mayor control
                            de las ordenes.
                        </p>
                    </div>
                    <div
                        class="col-lg-3 col-sm-6 col-xs-12 mb-4"
                        data-aos="fade-down"
                        data-aos-delay="400"
                    >
                        <i class="material-icons">table_view</i>
                        <h3>Gestion por Excel</h3>
                        <p>
                            Gestiona y organiza los pedidos en tiempo real en un
                            archivo de Excel con nuestra integracion a Google
                            Sheets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <!-- END FEATURES SECTION -->

        <!-- DEMO SECTION -->
        <section class="samples">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col">
                        <h2 data-aos="fade-down">¡Pruébalo tú mismo!</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 offset-lg-2 mb-5">
                        <h4 class="mb-5" data-aos="fade-right">
                            Utiliza nuestro demo y comprueba tú mismo todos los
                            beneficios.
                        </h4>
                        <a
                            class="primary-cta"
                            data-aos="fade-right"
                            style="text-decoration: none"
                            href="/wp/demo"
                            @click="logEntry('demo', 'demo button')"
                            >DEMO</a
                        >
                    </div>
                    <div class="col-lg-4">
                        <img
                            :src="require('@/assets/landing/qr.png')"
                            class="img-fluid"
                            style="background-color: #fff"
                        />
                    </div>
                </div>
            </div>
        </section>
        <!-- END DEMO SECTION -->

        <!-- HOW IT WORKS SECTION -->
        <section class="steps">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h2 data-aos="fade-down">Como funciona</h2>
                    </div>
                </div>
                <div class="row" style="margin-bottom: 50px">
                    <div
                        class="col-lg col-6"
                        data-aos="flip-left"
                        data-aos-delay="100"
                    >
                        <h3>1.</h3>
                        <p>
                            Ponte en contacto con nosotros para suscribirte a
                            nuestro servicio.
                        </p>
                    </div>
                    <div
                        class="col-lg col-6"
                        data-aos="flip-left"
                        data-aos-delay="200"
                    >
                        <h3>2.</h3>
                        <p>Envíanos el menú de tu restaurante o negocio.</p>
                    </div>
                    <div
                        class="col-lg col-6"
                        data-aos="flip-left"
                        data-aos-delay="300"
                    >
                        <h3>3.</h3>
                        <p>
                            Nosotros crearemos una versión en línea de tu menú
                            en nuestra plataforma.
                        </p>
                    </div>
                    <div
                        class="col-lg col-6"
                        data-aos="flip-left"
                        data-aos-delay="400"
                    >
                        <h3>4.</h3>
                        <p>
                            Te enviaremos el enlace de tu menú en linea para que
                            envies a tus contactos y coloques en tus redes
                            sociales.
                        </p>
                    </div>
                    <div
                        class="col-lg col-6"
                        data-aos="flip-left"
                        data-aos-delay="400"
                    >
                        <h3>5.</h3>
                        <p>
                            Tus clientes podrán ver tu menú desde su smartphone
                            y realizar pedidos directo en el app.
                        </p>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col text-center">
                        <a
                            href="#subscribe"
                            class="primary-cta mb-3"
                            style="text-decoration: none"
                            data-aos="fade-up"
                            v-smooth-scroll
                            @click="logEntry('howworks', 'subscribe')"
                            >Suscríbete</a
                        >
                    </div>
                </div>
            </div>
        </section>
        <!-- END HOW IT WORKS SECTION -->

        <!-- CONTACT SECTION -->
        <section class="contact" id="subscribe">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h2 data-aos="zoom-in">
                            Contáctanos para suscribirte
                            <br />a nuestro servicio
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            class="float-right"
                            placeholder="Nombre completo *"
                            data-aos="zoom-in-up"
                            data-aos-delay="100"
                            v-model="form.name"
                            data-hj-allow
                        />
                    </div>
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            placeholder="Nombre del Restaurante *"
                            data-aos="zoom-in-up"
                            data-aos-delay="100"
                            v-model="form.restaurantName"
                            data-hj-allow
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            class="float-right"
                            placeholder="Correo electrónico *"
                            data-aos="zoom-in-up"
                            data-aos-delay="200"
                            v-model="form.email"
                            data-hj-allow
                        />
                    </div>
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            placeholder="Teléfono *"
                            data-aos="zoom-in-up"
                            data-aos-delay="200"
                            v-model="form.phone"
                            data-hj-allow
                        />
                    </div>
                </div>
                <div class="row text-center" style="margin-top: 20px">
                    <div class="col-12">
                        <button
                            class="primary-cta mb-4"
                            data-aos="zoom-in-up"
                            data-aos-delay="300"
                            @click="sendEmail"
                        >
                            ENVIAR SOLICITUD
                        </button>
                        <p>
                            o escríbenos
                            <br />correo: contacto@mimenudigital.app
                            <br />
                            <a
                                href="http://wa.me/50764806778"
                                target="_blank"
                                style="color: #ffffff"
                                >WhatsApp: 6480-6778</a
                            >
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <!-- END CONTACT SECTION -->

        <!-- FOOTER SECTION -->
        <footer>
            <div class="container">
                <div class="row text-center">
                    <div class="col">
                        <img
                            :src="require('@/assets/landing/logo_grey.png')"
                            width="200px;"
                        />

                        <p>Powered By BlueBalloon Inc.</p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- END FOOTER SECTION -->
    </div>
</template>

<script>
import emailjs from 'emailjs-com'
export default {
    data() {
        return {
            form: {
                name: '',
                restaurantName: '',
                email: '',
                phone: '',
            },
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        logEntry(section, action) {
            this.$analytics.logEvent('Landing Action', {
                content_section: section,
                content_action: action,
            })
        },
        sendEmail() {
            if (
                this.form.name === '' ||
                this.form.restaurantName === '' ||
                this.form.email === '' ||
                this.form.phone === ''
            ) {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor asegurate de llenar todos los campos'
                this.alertType = 'error'
                this.displayAlert = true
                return
            } else {
                this.displayLoading = true
                emailjs
                    .send(
                        'gmail',
                        'template_Nldne3t8',
                        this.form,
                        'user_l9KYZVj8DNvwXi3kegar5'
                    )
                    .then(
                        result => {
                            this.logEntry('email', 'sendEmail')
                            this.displayLoading = false
                            this.alertTitle = 'Exito!'
                            this.alertMessage =
                                'Tu mensaje ha sido enviado con exito, pronto nos estaremos poniendo en contacto contigo'
                            this.alertType = 'success'
                            this.displayAlert = true
                            this.form.name = ''
                            this.form.email = ''
                            this.form.phone = ''
                            this.form.restaurantName = ''
                        },
                        error => {
                            this.displayLoading = false
                            this.alertTitle = 'Error'
                            this.alertMessage =
                                'Hubo un error por favor intentarlo nuevamente.'
                            this.alertType = 'error'
                            this.displayAlert = true
                        }
                    )
            }
        },
    },
    mounted() {
        window.scrollTo(0, 0)
        if (
            this.$route.fullPath == '/' ||
            this.$route.fullPath.includes('/#')
        ) {
            var element = document.createElement('link')
            element.setAttribute('rel', 'stylesheet')
            element.setAttribute('type', 'text/css')
            element.setAttribute(
                'href',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
            )
            document.getElementsByTagName('head')[0].appendChild(element)
        }
    },
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
@import './../styles/style.css';
</style>
