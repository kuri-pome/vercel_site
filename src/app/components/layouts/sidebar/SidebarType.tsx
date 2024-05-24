export interface menuItemsType {
    title: string;
    subItems: Array<subItemsType>;
};

interface subItemsType {
    subTitle: string;
    link: string;
}