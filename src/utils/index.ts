export const px2vw = (size: number, width: number = 1920): string => `${(size / width) * 100}vw`;
export const px2vh = (size: number, height: number = 1080): string => `${(size / height) * 100}vh`;

export const stringCmp = (str1: string, str2: string): boolean => {
    return str1.localeCompare(str2) === 1;
};

export const JoinStrings = (str1: string, str2: string): string => {
    return stringCmp(str1, str2) ? `${str1}_${str2}` : `${str2}_${str1}`;
};