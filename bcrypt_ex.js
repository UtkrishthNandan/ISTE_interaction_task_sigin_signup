const bcrypt=require('bcrypt');
const passw="91usn";
bcrypt.hash(passw,5).then(hash=>{
    console.log(hash)
})
var hash="$2b$05$j96CLU0mevYrYzVjh9ZLVe6KUuVQvuqze4rJwgSvAADi4VFL7Og4y"
hash="$2b$05$n2ExIkUMhX4w.0kr/DiUvO5XRbfI8a4/RySQdHq2DI0b4XhQv0LfG"
const fu=(hashed)=>{
    var verified;
    bcrypt.compare(passw,hashed)
.then((res)=>{
    verified=res;
    console.log(verified)
});
return  await verified}
console.log(fu(hash));
