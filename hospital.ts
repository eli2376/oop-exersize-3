class person {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class patient extends person {
  patientId: string;

  constructor(firstName: string, lastName: string, patientId: string) {
    super(firstName, lastName);
    this.patientId = patientId;
  }
}

let patientDetails = new patient("Eli", "Mershine", "291736382");
console.log(patientDetails);


class doctor extends person {
    doctorID : string
    specialization : string


    constructor(firstName: string, lastName: string,doctorID: string, specialization: string){
        super(firstName, lastName)
        this.doctorID = doctorID
        this.specialization = specialization
    }
}

let doctorDetails = new doctor("yaron", "levi", "2034", "specialization")
console.log(doctorDetails);
    
class Appointment extends person {
    patient : string
    doctor: string;
    date: string;
    time: string;


    constructor(firstName: string, lastName: string, patient: string, doctor: string, date: string, time: string) {
        super(firstName,lastName)
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
      }

      AppointmentDetails(): void{
        console.log(`patient: ${patientDetails} is invaited to Dr.: ${doctorDetails} on ${
            this.date
          } at ${this.time}.`);
        
      }
}

class Hospital {
    doctors : doctor[];
    patients: patient[];
    appointments: Appointment[];
    name :string;


    constructor(doctors: doctor[], patients: patient[], appointments: Appointment[], name: string)
{    this.name = name;
    this.doctors = doctors;
    this.patients = patients;
    this.appointments = appointments;}


    
}   

