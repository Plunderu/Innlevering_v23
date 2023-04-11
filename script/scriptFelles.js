        /* Henter hamburgerelementet */
        const burgerEl = document.querySelector('.fa-bars')

        /* Henter navelementet */
        const navEl = document.querySelector('.nav')

        burgerEl.addEventListener('click', showNav)

        //Funksjon som legger til CSSklassen Show til Navbar
        function showNav(){
            navEl.classList.toggle('show')
        }
        