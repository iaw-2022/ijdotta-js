export type Patient = {
  id: number,
  name: string,
  lastname: string,
  email: string,
  healthInsuranceCompany?: string
  healthInsuranceId?: string
}