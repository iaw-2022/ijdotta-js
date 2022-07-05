export type Treatment = {
    title: string,
    description: string,
}

export type TreatmentsPerDate = {
    date: Date,
    treatments: Treatment[],
}