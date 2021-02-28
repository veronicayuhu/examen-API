import mongoose from "../connection/connect.js";

class ToDoModel {
    constructor(){
        this.Schema = mongoose.Schema;
        this.ToDoSchema = this.Schema({
            name:String, 
            description:String, 
            date: Date,
            hour: String, 
            done: Boolean
        });
        this.mymodel = mongoose.model("ToDo", this.ToDoSchema);
    }

    // 3.1 Agregar tareas
    createToDo( name, description, date, hour, done){

        var toDo = { name, description, date, hour, done};

        var newToDo = new this.mymodel(toDo);
        var error = newToDo.validateSync();
        return new Promise((resolve, reject) => {
            if(error) {
                resolve(error);
                return;
            }
            newToDo.save().then((docs) => {
                resolve(docs);
            });
        });
        
    }

    // 3.2 Borrar tareas
    deleteToDo(id) {
        return new Promise((resolve, reject) => {
          this.mymodel.remove({ _id: id }).then((err, docs) => {
            if (err) {
              resolve(err);
              return;
            }
            resolve(docs);
          });
        });
      }

    // 3.3 Actualizar tareas
    updateToDo(id, toDo){
        return new Promise((resolve, reject) => {
            this.mymodel.update({_id: id}, {$set: toDo} , (err, docs) => {
                if(err){
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
    }

    // 3.4 Mostrar tareas
    getToDo(){
        return new Promise((resolve, reject) => {
            this.mymodel.find({}, (err, docs) => {
                if(err){
                    resolve(err);
                    return;
                }
                resolve(docs); 
            });
        });
    }

    // Actualizar la tarea como realizada
    updateDoneToDo(id){
        return new Promise((resolve, reject) => {
            this.mymodel.update({_id: id}, {done: true}, (err, docs) => {
                if(err){
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
    }
}

export default ToDoModel;