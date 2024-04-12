
import { CollectionDataResponse } from "~/services/rest.types"
export type ProviderItem = {
    id: number
    name: string
}
    
export type ProviderListResponse = CollectionDataResponse<ProviderItem[]>