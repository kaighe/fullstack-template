import * as crypto from 'crypto';

export function password_hash(password: string, salt: string){
    const hash = crypto.createHash('sha1');
    hash.update(salt+password);
    return hash.digest('hex');
}

export function generate_salt(){
    const randomBytes: Buffer = crypto.randomBytes(6);
    return randomBytes.toString('base64');
}