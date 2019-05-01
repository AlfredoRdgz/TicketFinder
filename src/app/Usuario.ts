export class Usuario {
    constructor(
        public id: number,
        public usuario:string,
        public correo: string,
        public contrasena: string,
        public esAdmin: boolean
    ) {}
}
