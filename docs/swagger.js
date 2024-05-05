const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "PRACTICA FINAL",
        version: "0.0.1",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "javier.nunez@u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            Usuarios: {
                type: "object",
                required: ["name","rol","email","password", "edad", "ciudad", "intereses", "permiteRecibirOfertas"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    rol: {
                      type: "string",
                      example: "miembro"
                    },
                    email: {
                      type: "string",
                      example: "miemail@google.com"
                    },
                    password: {
                        type: "string"
                    },
                    edad: {
                        type: "integer",
                        example: 20
                    },
                    ciudad: {
                      type: "string"
                    },
                    intereses:{
                      type: "[string]"
                    },
                    //Boolean
                    permiteRecibirOfertas:{
                      type: "Boolean",
                      example: "True"
                    },
                },
            },
            Comercios: {
              type: "object",
              required: ["name", "cif","direccion", "email", "telefono"],
              properties: {
                  name: {
                      type: "string",
                      example: "Menganito"
                  },
                  cif: {
                      type: "string",
                  },
                  direccion: {
                    type: "string",
                    example: "miemail@google.com"
                  },
                  email: {
                      type: "string",
                      example: "miemail@google.com"
                  },
                  telefono: {
                      type: "integer",
                      example: 601377805
                  },
              },
            },
            Publicaciones: {
              type: "object",
              required: ["name", "age", "email", "password"],
              properties: {
                  name: {
                      type: "string",
                      example: "Menganito"
                  },
                  age: {
                      type: "integer",
                      example: 20
                  },
                  email: {
                      type: "string",
                      example: "miemail@google.com"
                  },
                  password: {
                      type: "string"
                  },
              },
            }
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)