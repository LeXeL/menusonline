<template>
    <div class="landing-body">
        <!-- HERO SECTION -->
        <section class="hero">
            <nav>
                <div class="container">
                    <img :src="require('@/assets/landing/logo.png')" width="200px;" />
                    <a href="#subscribe" class="float-right" v-smooth-scroll>suscribete</a>
                    <!-- <a href="#" class="float-right mr-3">como funciona</a>
                    <a href="#" class="float-right mr-3">caracteristicas</a>-->
                </div>
            </nav>
            <div class="container">
                <div clas="row">
                    <div class="col-lg-6 col-xs-12">
                        <h2 style="padding-top: 125px;">Menu en linea para tu restaurante.</h2>
                        <p class="pb-5">
                            Digitaliza tu menu con nosotros y evita el contacto
                            al presentarlo en linea a tus clientes mediante
                            codigo QR o un enlace de acceso rapido.
                        </p>
                        <a
                            href="#subscribe"
                            class="primary-cta mr-3 mb-3"
                            style="text-decoration: none;"
                            v-smooth-scroll
                        >Suscribete</a>
                        <span v-if="$q.platform.is.mobile">
                            <br />
                            <br />
                            <br />
                        </span>
                        <a
                            href="#features"
                            class="secondary-cta mb-3"
                            style="text-decoration: none;"
                            v-smooth-scroll
                        >Leer Mas</a>
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
                            Escoje con que colores deseas presentar tu menu para
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
                        <h3>menu en smartphones</h3>
                        <p>
                            Olvidate de las cartas y brindale a tus clientes la
                            comodidad de ver el menu directo en sus dispositivos
                            moviles.
                        </p>
                    </div>
                    <div
                        class="col-lg-3 col-sm-6 col-xs-12 mb-4"
                        data-aos="fade-down"
                        data-aos-delay="300"
                    >
                        <i class="material-icons">qr_code</i>
                        <h3>acceso por QR</h3>
                        <p>
                            Accesa facilmente al menu de tu restaurante solo con
                            escanear el codigo QR unico para ti.
                        </p>
                    </div>
                    <div
                        class="col-lg-3 col-sm-6 col-xs-12 mb-4"
                        data-aos="fade-down"
                        data-aos-delay="400"
                    >
                        <i class="material-icons">http</i>
                        <h3>acceso por URL</h3>
                        <p>
                            Tambien puedes acceder desde el navegador de tu
                            telefono con una direccion web facil de escribir y
                            hecha especialmente para ti.
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
                        <h2 data-aos="fade-down">¡Pruebalo tu mismo!</h2>
                    </div>
                    <!-- <div class="col-lg-3 col-xs-3">
            <img src="img/menu-page.jpg" class="img-fluid" />
          </div>
          <div class="col-lg-3 col-xs-3">
            <img src="img/menu-page.jpg" class="img-fluid" />
          </div>
          <div class="col-lg-3 col-xs-3">
            <img src="img/menu-page.jpg" class="img-fluid" />
          </div>
          <div class="col-lg-3 col-xs-3">
            <img src="img/menu-page.jpg" class="img-fluid" />
                    </div>-->
                </div>
                <div class="row">
                    <div class="col-lg-4 offset-lg-2">
                        <h4 class="mb-5" data-aos="fade-right">
                            Escanea el codigo QR con tu telefono o haz click en
                            el boton de abajo.
                        </h4>
                        <button class="primary-cta mb-3" data-aos="fade-right">DEMO</button>
                    </div>
                    <div class="col-lg-4">
                        <img
                            :src="require('@/assets/landing/qr.png')"
                            class="img-fluid"
                            style="padding: 15px; background-color: #fff;"
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
                <div class="row" style="margin-bottom: 50px;">
                    <div class="col-lg col-6" data-aos="flip-left" data-aos-delay="100">
                        <h3>1.</h3>
                        <p>
                            Ponte en contacto con nosotros para suscribirte a
                            nuestro servicio.
                        </p>
                    </div>
                    <div class="col-lg col-6" data-aos="flip-left" data-aos-delay="200">
                        <h3>2.</h3>
                        <p>
                            Envianos una copia del menu de tu restaurante o
                            negocio.
                        </p>
                    </div>
                    <div class="col-lg col-6" data-aos="flip-left" data-aos-delay="300">
                        <h3>3.</h3>
                        <p>
                            Nosotros crearemos una version en linea de tu menu
                            en nuestra plataforma.
                        </p>
                    </div>
                    <div class="col-lg col-6" data-aos="flip-left" data-aos-delay="400">
                        <h3>4.</h3>
                        <p>
                            Te enviaremos impresiones de los codigos QR para que
                            pongas en tus mesas o le des a tus meseros.
                        </p>
                    </div>
                    <div class="col-lg col-6" data-aos="flip-left" data-aos-delay="400">
                        <h3>5.</h3>
                        <p>Tus clientes podran ver tu menu desde su smartphone.</p>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col text-center">
                        <a
                            href="#subscribe"
                            class="primary-cta mb-3"
                            style="text-decoration: none;"
                            data-aos="fade-up"
                            v-smooth-scroll
                        >Suscribete</a>
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
                            Contactanos para suscribirte
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
                        />
                    </div>
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            placeholder="Restaurante *"
                            data-aos="zoom-in-up"
                            data-aos-delay="100"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            class="float-right"
                            placeholder="Correo electronico *"
                            data-aos="zoom-in-up"
                            data-aos-delay="200"
                        />
                    </div>
                    <div class="col-lg-6 col-sm-6 col-xs-12">
                        <input
                            type="text"
                            placeholder="Telefono *"
                            data-aos="zoom-in-up"
                            data-aos-delay="200"
                        />
                    </div>
                </div>
                <div class="row text-center" style="margin-top: 20px;">
                    <div class="col-12">
                        <button
                            class="primary-cta mb-4"
                            data-aos="zoom-in-up"
                            data-aos-delay="300"
                        >ENVIAR SOLICITUD</button>
                        <p>
                            o escribenos
                            <br />correo: contacto@mimenudigital.app
                            <br />Whatsapp: 6565-6556
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
                        <img :src="require('@/assets/landing/logo_grey.png')" width="200px;" />

                        <p>
                            Powered By
                            <a href="#">BlueBalloon Inc.</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- END FOOTER SECTION -->
    </div>
</template>

<style scoped>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
@import './../styles/style.css';
</style>

<script>
export default {
    mounted() {
        if (this.$route.fullPath == '/') {
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
