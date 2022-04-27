import mongoose from 'mongoose'
import log from '../utils/logger'

const map = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)

    log.info(`Successfully connect to database ${conn.connection.host}`)
  } catch (err) {
    log.error(err)
  }
}

export default map
