import * as mongoose from 'mongoose';


const ProducerSupplySchema = new mongoose.Schema({
  supply_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supply',
    required: false,
    //Este ultimo required false esta pensado para un supply "otro" que no tenga tipo en la base
  },
  name: { type: String, required: false,},
  technical_description: String,
  photo_url: String,

});

export default ProducerSupplySchema;
