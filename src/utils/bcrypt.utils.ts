import * as bcrypt from 'bcrypt';

export const bcryptHash = async (data: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data, saltOrRounds);

    return hash;
}

export const bcryptCompare = async (data: string, hash: string) => {

    const isMatch = await bcrypt.compare(data, hash);

    return isMatch;
}