import { fetchConToken, fetchSinToken } from "../../helpers/fetch";




describe('Pruebas en el fetch.js', () => {
    let token = '';
    test('fetch less token should work', async() => { 
        const resp =  await fetchSinToken('auth',{email:"fernandorar44424@gmail.com", passwd: "1231231221"}, 'POST' );
        expect(resp instanceof Response).toBe(true)
        const body = await resp.json();
        expect(body.ok).toBe(true)
        token = body.token;

    })

    test('fetch whit token should work', async() => {   
        localStorage.setItem('token', token)
        const resp =  await fetchConToken('events/6217ad7f61eae9b5566b67e5', {}, 'DELETE');
        const body =  await resp.json();       
        expect(body.msg).toBe('Evento no encontrado')

    })

});
