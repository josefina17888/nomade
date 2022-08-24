export default function validate (input){
    let errors = {}
   
    if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)$/.test(input.name)) {
        errors.name =
          "(*)Name must contain only letters and spaces (and not end in space)";
      }
      else{
        errors.name= ""
      }
    if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)$/.test(input.lastname)) {
        errors.lastname =
          "(*)Lastname must contain only letters and spaces (and not end in space)";
      }
    
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
        errors.email =
          "(*)Lastname must contain only letters and spaces (and not end in space)";
      }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?: \.[a-zA-Z0-9-]+)*$/.test(input.password)) {
        errors.password =
          "(*)Lastname must contain only letters and spaces (and not end in space)";
      }
      
      
      return errors
}
// let required = (input)=>{
//   let notRequired = {}
//   if (!/^\d+$/.test(input.dni)) {
//     notRequired.dni = " (*) Must be an integer positive number";
//   }
//   if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(input.cellPhone)) {
//     notRequired.cellPhone = " (*) Must be an integer positive number";
//   }
//   if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)$/.test(input.country)) {
//     notRequired.country =
//       "(*)Name must contain only letters and spaces (and not end in space)";
//   }
//   return notRequired
// }
