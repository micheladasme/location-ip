// Mayuscula por que es variable global
const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e17837fb8bmsh2280ecf9ec10788p1c14a8jsn4696e77ae394',
		'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
	}
};

const fetchIpInfo = ip => {
    return fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err));
}

// el signo $ en la variable para identificar que es un contenido del DOM
const $form = document.getElementById('form')
const $input = document.getElementById('input')
const $submit = document.getElementById('submit')
const $results = document.getElementById('results')

$form.addEventListener('submit', async (event) => {
    // Para evitar que se refresque la pagina
    event.preventDefault()

    const {value} = $input
    if (!value) return

    // Para evitar que el cliente apriete el boton mientras cargue la peticion, desabilitamos el boton
    $submit.setAttribute('disabled', '')
    $submit.setAttribute('aria-busy', 'true')

    const ipInfo = await fetchIpInfo(value)

    if (ipInfo) {
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
    }

    $submit.removeAttribute('disabled');
    $submit.removeAttribute('aria-busy');
})