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
            errors.lodgingType = "Campo Requerido";
        }
        else if(!input.guests){
            errors.guests = "Campo Requerido";
        }
        else if (!input.rooms ) {
            errors.rooms = "Campo Requerido";
        }
        else if (!input.beds ){
            errors.beds= "Campo Requerido";
        }
        else if (!input.currency ){
            errors.currency= "Campo Requerido";
        }
        else if (!input.price ) {
            errors.price = "Campo Requerido";
        }
        else if (!input.bathrooms ) {
            errors.bathrooms = "Campo Requerido";
        }
        else if (!input.city) {
            errors.city = "Campo Requerido";
        }
        else if(!validateName.test(input.city)){
            errors.city ="La ciudad solo puede contener letras"
        }
        else if (!input.country){
            errors.country = "Campo Requerido";
        }
        else if (!input.description ){
            errors.description = "Campo Requerido";
        }
        else if (input.picture < 1){
            errors.picture = "Minimo 3 fotos";
        }
        if (typeof input.picture !== 'string' && input.picture < 3){
            errors.picture = "Minimo 3 imagenes";
        }
        else if(input.picture > 10){
            errors.picture = "Maximo 10 imagenes";
        }
        
        if(!input.latitud){
            errors.latitud = "Debes verificar la direccion";
        }
        return errors
    }