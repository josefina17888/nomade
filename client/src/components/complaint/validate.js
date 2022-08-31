export default function validate (input)
    {
        let errors={}
        if(!input.tipo)
        {
            errors.tipo ="Debe seleccionar un problema"
        }
        else if(!input.descripcion){
            errors.descripcion ="Debe dar una descripcion"
        }

        return errors
    }