export default function validate (input)
    {
        let errors={}
        if(!input.rating)
        {
            errors.rating ="Debe puntuar el hospedaje"
        }
        else if(!input.comments){
            errors.comments ="Debe dejar un comentario"
        }

        return errors
    }