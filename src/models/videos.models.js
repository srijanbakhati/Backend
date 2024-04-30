import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videosSchema=new Schema(
    {
        videoFile:{
            type:String,
            required:true,  
        },
        thumbnail:{
            type:String,
            required:true,  
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true,  
        },
        duration:{
            type:Number,
            required:true,
        },
        view:{
            type:Number,
            default:0,
            required:true
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

videosSchema.plugin(mongooseAggregatePaginate)

export const Videos=mongoose.model("Videos",videosSchema);