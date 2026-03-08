export interface IProduct {
  _id?:string,
  name:string,
  price:number,
  quantity:number,
  imageURL:string,
  category:string,
  gender:string,
  description:string,
  ratings?:number,
  reviews?:[string]
}
