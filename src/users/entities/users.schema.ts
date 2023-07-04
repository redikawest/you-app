import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true})
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    displayName: string;

    @Prop({ required: false })
    image: string;

    @Prop({ required: false })
    birthdate: string;

    @Prop({ required: false })
    horoscope: string;

    @Prop({ required: false })
    zodiac: string;

    @Prop({ required: false })
    height: number;

    @Prop({ required: false })
    weight: number;
}

export const UserSchema = SchemaFactory.createForClass(User);