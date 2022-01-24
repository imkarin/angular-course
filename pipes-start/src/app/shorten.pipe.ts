import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    // It's not always nessecary to implement PipeTransform interface, but it's good practice
    transform(value: any, length: number) { // 2nd/3rd... arguments would be arguments that you pass to your pipe (like date:format)
        let newVal = value.substr(0, length) 
        if (value.length > length) {
             newVal = newVal += '...';
        }
        return newVal // always needs to return something
    }
}

// Don't forget to add this pipe to your module
