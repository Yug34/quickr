export const px2vw = (size: number, width: number = 1920): string => `${(size / width) * 100}vw`;
export const px2vh = (size: number, height: number = 1080): string => `${(size / height) * 100}vh`;

export const stringCmp = (str1: string, str2: string): boolean => {
    return str1.localeCompare(str2) === 1;
};

export const trimStringToLength = (text: string, length: number): string => {
    if (text.length > length) {
        let cumulativeLength = 0;
        //Logic to only split the string only after a word is complete
        if (text.includes(" ")) {
            text.split(" ").forEach((str) => {
                if (cumulativeLength + str.length >= length) {
                    return cumulativeLength;
                }
                cumulativeLength += str.length;
            });
            return text.substring(0, cumulativeLength + 1) + "...";
        } else {
            return text.substring(0, length - 5) + "...";
        }
    }
    //return as is if string is small
    return text;
};

export const JoinStrings = (str1: string, str2: string): string => {
    return stringCmp(str1, str2) ? `${str1}_${str2}` : `${str2}_${str1}`;
};