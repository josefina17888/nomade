export default function validate (input)
    {
        let validateName =  /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let errors={}
        if(!input.title)
        {
            errors.title ="Se requiere un titulo"
        }
        else if( input.title.length < 4){
            errors.title ="El titulo debe tener como minimo 4 letras"
        }
        else if(!validateName.test(input.title)){
            errors.title ="El titulo solo puede contener letras"
        }
        else if (!input.lodgingType ) {
            errors.lodgingType = "Debes completar el campo de hospedaje";
        }
        else if(!input.guests){
            errors.guests = "Debes completar el campo de huespeds";
        }
        else if (!input.rooms ) {
            errors.rooms = "Debes completar el campo de habitaciones";
        }
        else if (!input.beds ){
            errors.beds= "Debes completar el campo camas";
        }
        else if (!input.currency ){
            errors.currency= "Debes completar el campo de moneda";
        }
        else if (!input.price ) {
            errors.price = "Debes completar el campo de precio";
        }
        else if (!input.bathrooms ) {
            errors.bathrooms = "Debes completar el campo de baños";
        }
        else if (!input.city) {
            errors.city = "Debes completar el campo ciudad";
        }
        else if(!validateName.test(input.city)){
            errors.city ="La ciudad solo puede contener letras"
        }
        else if (!input.country){
            errors.country = "Debes completar el campo pais";
        }
        else if(!validateName.test(input.country)){
            errors.country ="El pais solo puede contener letras"
        }
        else if (!input.address ) {
            errors.address = "Debes completar el campo direccion";
        }
        else if (!input.description ){
            errors.description = "Debes completar el campo descripcion";
        }
        else if (input.picture < 1){
            errors.picture = "Debe completar el campo imagen. recuerde subir 3 fotos";
        }
        else if (input.picture !== 3){
            errors.picture = "Debes subir 3 imagenes";
        }
       
       

        return errors
    }