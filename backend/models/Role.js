// import mongoose from 'mongoose';

// const roleSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   permissions: [String],
// });

// export default mongoose.model('Role', roleSchema);
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [
    {
      key: { type: String, required: true },        // e.g., "can-read"
      action: { type: String, required: true },     // e.g., "read"
      resource: { type: String, required: true },   // e.g., "notes"
    },
  ],
});

export default mongoose.model('Role', roleSchema);
