const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    contact: {
      name: 'u-tad',
      url: 'https://u-tad.com',
      email: 'javier.nunez@u-tad.com',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        },
      },
      schemas: {
        Control_Usuarios: {
          type: 'object',
          required: ['name', 'rol', 'email', 'password', 'edad', 'ciudad', 'intereses', 'permiteRecibirOfertas'],
          properties: {
            name: {
              type: 'string',
              example: 'Menganito'
            },
            rol: {
              type: 'string',
              example: 'miembro'
            },
            email: {
              type: 'string',
              example: 'miemail@google.com'
            },
            password: {
              type: 'string'
            },
            edad: {
              type: 'integer',
              example: 20
            },
            ciudad: {
              type: 'string'
            },
            intereses: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            permiteRecibirOfertas: {
              type: 'boolean',
              example: true
            },
          },
        },
        Comercios: {
          type: 'object',
          required: ['name', 'cif', 'direccion', 'email', 'telefono'],
          properties: {
            name: {
              type: 'string',
              example: 'Menganito'
            },
            cif: {
              type: 'string',
            },
            direccion: {
              type: 'string',
              example: 'miemail@google.com'
            },
            email: {
              type: 'string',
              example: 'miemail@google.com'
            },
            telefono: {
              type: 'integer',
              example: 601377805
            },
          },
        },
        Publicaciones: {
          type: 'object',
          required: ['name', 'age', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Menganito'
            },
            age: {
              type: 'integer',
              example: 20
            },
            email: {
              type: 'string',
              example: 'miemail@google.com'
            },
            password: {
              type: 'string'
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
//CONTROL
swaggerSpecs.paths['/api/control'] = {
  get: {
    summary: 'Obtener todos los usuario',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
  post: {
    summary: 'Crear un nuevo usuario',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                example: 'Francisco'
              },
              rol: {
                type: 'string',
                example: 'miembro'
              },
              email: {
                type: 'string',
                example: 'dadlladd0@example.com'
              },
              password: {
                type: 'string',
                example: '123'
              },
              edad: {
                type: 'integer',
                example: 34
              },
              ciudad: {
                type: 'string',
                example: 'Barcelona'
              },
              intereses: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['Padel', 'Fauna']
              },
              permiteRecibirOfertas: {
                type: 'boolean',
                example: true
              }
            },
            required: ['nombre', 'rol', 'email', 'password', 'edad', 'ciudad', 'intereses', 'permiteRecibirOfertas']
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Usuario creado exitosamente'
      },
      400: {
        description: 'Error en la solicitud'
      }
    }
  }
};

swaggerSpecs.paths['/api/control/rol/{rol}'] = {
  get: {
    summary: 'Obtener usuarios por su rol',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
};

swaggerSpecs.paths['/api/control/{id}'] = {
  get: {
    summary: 'Obtener un usuario',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar un usuario por su ID',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID del usuario',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                example: 'Nuevo nombre'
              },
              rol: {
                type: 'string',
                example: 'admin'
              },
              email: {
                type: 'string',
                example: 'nuevo@example.com'
              },
              password: {
                type: 'string',
                example: 'nuevacontraseña'
              },
              edad: {
                type: 'integer',
                example: 31
              },
              ciudad: {
                type: 'string',
                example: 'Nueva Ciudad'
              },
              intereses: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['música', 'viajes']
              },
              permiteRecibirOfertas: {
                type: 'boolean',
                example: false
              }
            },
            required: ['nombre', 'rol', 'email', 'password', 'edad', 'ciudad', 'intereses', 'permiteRecibirOfertas']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Usuario actualizado exitosamente'
      },
      404: {
        description: 'Usuario no encontrado'
      }
    }
  },
  delete: {
    summary: 'Eliminar un usuario por su ID',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID del usuario',
      },
    ],
    responses: {
      200: {
        description: 'Usuario eliminado exitosamente'
      },
      404: {
        description: 'Usuario no encontrado'
      }
    }
  }
};

swaggerSpecs.paths['/api/control/ciudad/{ciudad}'] = {
  get: {
    summary: 'Obtener usuarios por ciudad',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
};

swaggerSpecs.paths['/api/control/intereses/{interes}'] = {
  get: {
    summary: 'Obtener usuarios por intereses',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
};

//COMERCIO
swaggerSpecs.paths['/api/comercio'] = {
  get: {
    summary: 'Obtener todos los comercio',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
  post: {
    summary: 'Crear un nuevo comercio',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                example: 'Francisco'
              },
              CIF:{
                type: 'string',
                example: '111111111'
              },
              email: {
                type: 'string',
                example: 'dadlladd0@example.com'
              },
              password: {
                type: 'string',
                example: '123'
              },
              direccion: {
                type: 'string',
                example: 'Barcelona'
              },
              telefono: {
                type: 'integer',
                example: 601377899
              },
            },
            required: ['nombre', 'email', 'password', 'CIF', 'direccion', 'telefono']
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Usuario creado exitosamente'
      },
      400: {
        description: 'Error en la solicitud'
      }
    }
  }
};

swaggerSpecs.paths['/api/comercio/{id}'] = {
  get: {
    summary: 'Obtener un comercio',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar un comercio por su ID',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID del usuario',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                example: 'Nuevo nombre'
              },
              rol: {
                type: 'string',
                example: 'admin'
              },
              email: {
                type: 'string',
                example: 'nuevo@example.com'
              },
              password: {
                type: 'string',
                example: 'nuevacontraseña'
              },
              edad: {
                type: 'integer',
                example: 31
              },
              ciudad: {
                type: 'string',
                example: 'Nueva Ciudad'
              },
              intereses: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['música', 'viajes']
              },
              permiteRecibirOfertas: {
                type: 'boolean',
                example: false
              }
            },
            required: ['nombre', 'rol', 'email', 'password', 'edad', 'ciudad', 'intereses', 'permiteRecibirOfertas']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Usuario actualizado exitosamente'
      },
      404: {
        description: 'Usuario no encontrado'
      }
    }
  },
  delete: {
    summary: 'Eliminar un comercio por su ID',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID del usuario',
      },
    ],
    responses: {
      200: {
        description: 'Usuario eliminado exitosamente'
      },
      404: {
        description: 'Usuario no encontrado'
      }
    }
  }
};

//PAGINAS WEB
swaggerSpecs.paths['/api/publicaciones'] = {
  get: {
    summary: 'Obtener todos las publicaciones',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
  post: {
    summary: 'Crear una nueva publicacion',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                example: 'Francisco'
              },
              rol: {
                type: 'string',
                example: 'miembro'
              },
              email: {
                type: 'string',
                example: 'dadlladd0@example.com'
              },
              password: {
                type: 'string',
                example: '123'
              },
              edad: {
                type: 'integer',
                example: 34
              },
              ciudad: {
                type: 'string',
                example: 'Barcelona'
              },
              intereses: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['Padel', 'Fauna']
              },
              permiteRecibirOfertas: {
                type: 'boolean',
                example: true
              }
            },
            required: ['nombre', 'rol', 'email', 'password', 'edad', 'ciudad', 'intereses', 'permiteRecibirOfertas']
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Usuario creado exitosamente'
      },
      400: {
        description: 'Error en la solicitud'
      }
    }
  }
};


swaggerSpecs.paths['/api/publicaciones/{id}'] = {
  get: {
    summary: 'Obtener una publicacion',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar un publicacion por su ID',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID del usuario',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                example: 'Nuevo nombre'
              },
              rol: {
                type: 'string',
                example: 'admin'
              },
              email: {
                type: 'string',
                example: 'nuevo@example.com'
              },
              password: {
                type: 'string',
                example: 'nuevacontraseña'
              },
              edad: {
                type: 'integer',
                example: 31
              },
              ciudad: {
                type: 'string',
                example: 'Nueva Ciudad'
              },
              intereses: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['música', 'viajes']
              },
              permiteRecibirOfertas: {
                type: 'boolean',
                example: false
              }
            },
            required: ['nombre', 'rol', 'email', 'password', 'edad', 'ciudad', 'intereses', 'permiteRecibirOfertas']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Usuario actualizado exitosamente'
      },
      404: {
        description: 'Usuario no encontrado'
      }
    }
  },
  delete: {
    summary: 'Eliminar un publicacion por su ID',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID del usuario',
      },
    ],
    responses: {
      200: {
        description: 'Usuario eliminado exitosamente'
      },
      404: {
        description: 'Usuario no encontrado'
      }
    }
  }
};

swaggerSpecs.paths['/api/publicaciones/ciudad/{ciudad}'] = {
  get: {
    summary: 'Obtener usuarios por ciudad',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
};

swaggerSpecs.paths['/api/publicaciones/actividad/{actividad}'] = {
  get: {
    summary: 'Obtener usuarios por intereses',
    responses: {
      200: {
        description: 'OK',
      },
      500: {
        description: 'Error del servidor',
      },
    },
  },
};

module.exports = swaggerSpecs;