export class LocalDB{
    constructor(data,table){
        this.data = data;   
        this.db = indexedDB.open('factura',1)
        this.db.onupgradeneeded(e=>{
            
        })
    }


}