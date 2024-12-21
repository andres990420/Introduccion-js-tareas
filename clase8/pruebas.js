function probarValidarInputNumeroEntero()
{
    console.assert(
        validarInputNumeroEntero(0) === 'El campo no puede ser 0',
        'Probar validar input numero entero fallo en validar que el campo no es 0'
    );

    console.assert(
        validarInputNumeroEntero(-1) === 'El campo no puede ser un numero negativo',
        'Probar validar input numero entero fallo en validar que el numero sea positivo'
    );

    console.assert(
        validarInputNumeroEntero(1.1) === 'El campo tiene que ser un numero entero',
        'Probar validar input numero entero fallo en validar que el numero ingresado sea un numero entero'
    );

    console.assert(
        validarInputNumeroEntero(5909090) === '',
        'Probar validar input numero entero fallo en validar un valor valido'
    );
}

probarValidarInputNumeroEntero();

function probarValidarSalario()
{
    console.assert(
        validarSalario(-20) === 'El campo no puede ser un numero negativo',
        'Probar validar salario fallo en validar que el campo no sea un numero negativo'
    );

    console.assert(
        validarSalario(20.20) === '',
        'Probar validar salario fallo en validar un valor valido'
    );
}

probarValidarSalario();