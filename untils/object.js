/**true if obj is empty
 * 
 */
export function isEmptyObject(obj){
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}