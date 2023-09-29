function getHelloWorld(param: any) {
    return new Response(JSON.stringify({
        hello: param.hello(),
        user: param.user({ lastname: 'Doe' })
    }));
}

export { getHelloWorld };