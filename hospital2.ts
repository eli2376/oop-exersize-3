abstract class Person {
    firstName: string;
    lastName: string;
    address: string;
    age: number;
    abstract getInfo(): void;
    abstract getId(): string;
    constructor(
      firstName: string,
      lastName: string,
      address: string,
      age: number
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.age = age;
    }
  }
  class Patient extends Person {
    private patientId: string;
    phoneNumber: number;
    emergencyConnect: string;
    medicalHistory: Appointment[];
    constructor(
      firstName: string,
      lastName: string,
      patientId: string,
      address: string,
      age: number,
      emergencyConnect: string,
      medicalHistory: Appointment[]
    ) {
      super(firstName, lastName, address, age);
      this.patientId = patientId;
      this.emergencyConnect = emergencyConnect;
      this.medicalHistory = medicalHistory;
    }
    getInfo(): void {
      console.log(
        `id: ${this.patientId}name: ${this.lastName} ${this.firstName}.`
      );
    }
    getId(): string {
      return this.patientId;
    }
    addMedicalHistory(appointment: Appointment): void {
      this.medicalHistory.push(appointment);
    }
  }
  class MedicalStaff extends Person {
    staffId: string;
    position: string;
    department: string;
    constructor(
      firstName: string,
      lastName: string,
      address: string,
      age: number,
      staffId: string,
      position: string,
      department: string
    ) {
      super(firstName, lastName, address, age);
      this.staffId = staffId;
      this.position = position;
      this.department = department;
    }
    getInfo(): void {
      console.log(
        `Medical staff member: ${this.lastName} ${this.firstName} from the ${this.department} department in the position of ${this.position}.`
      );
    }
    getId(): string {
      return this.staffId;
    }
  }
  class Doctor extends MedicalStaff {
    specialization: string;
    bigAge:number;
    smallAge:number;
    availability: string[];
    constructor(
      firstName: string,
      lastName: string,
      address: string,
      age: number,
      staffId: string,
      position: string,
      department: string,
      specialization: string,
      bigAge:number,
      smallAge:number,
      availability: string[]
    ) {
      super(firstName, lastName, address, age, staffId, position, department,bigAge,smallAge);
      this.specialization = specialization;
      this.availability = availability;
      this.bigAge = bigAge;
      this.smallAge= smallAge;
      availability = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
    }
    getInfo(): void {
      console.log(
        `Dr. ${this.lastName} ${this.firstName} from the ${this.department} department in the position of ${this.position} is specialization in ${this.specialization}.`
      );
    }
    getId(): string {
      return this.staffId;
    }
  }
  enum Status {
    designed,
    completed,
    cancelled,
  }
  class Appointment {
    patient: Patient;
    doctor: Doctor;
    date: string;
    time: string;
    status: Status;
    constructor(
      patient: Patient,
      doctor: Doctor,
      date: string,
      time: string,
      status: Status
    ) {
      this.patient = patient;
      this.doctor = doctor;
      this.date = date;
      this.time = time;
      this.status = status;
    }
    getInfo(): void {
      console.log(
        `patient: ${this.patient.getInfo()} is invited to Dr.: ${this.doctor.getInfo()} on ${
          this.date
        } at ${this.time}.`
      );
    }
    getStatus(): Status {
      return this.status;
    }
    statusUpdate(newStatus: Status): void {
      this.status = newStatus;
    }
  }
  class MedicalRecord {
    patient: Patient;
    doctor: Doctor;
    private diagnosis: string;
    prescription: string;
    constructor(
      patient: Patient,
      doctor: Doctor,
      diagnosis: string,
      prescription: string
    ) {
      this.patient = patient;
      this.doctor = doctor;
      this.diagnosis = diagnosis;
      this.prescription = prescription;
    }
    getDiagnosis(): void {
      console.log(this.diagnosis);
    }
  }
  class Hospital {
    doctors: Doctor[];
    patients: Patient[];
    appointments: Appointment[];
    medicalRecords: MedicalRecord[];
    name: string;
    constructor(
      doctor: Doctor[],
      patient: Patient[],
      appointment: Appointment[],
      medicalRecords: MedicalRecord[],
      name: string
    ) {
      this.name = name;
      this.doctors = doctor;
      this.patients = patient;
      this.appointments = appointment;
      this.medicalRecords = medicalRecords;
    }
    addDoctor(doctor: Doctor): void {
      this.doctors.push(doctor);
    }
    addPatient(patient: Patient): void {
      this.patients.push(patient);
    }
    addAppointment(appointment: Appointment): void {
      const date:string = appointment.date;
      const doctor: Doctor = appointment.doctor;
      const availability: string[] = this.getDoctorAvailability(doctor,date)
      if (appointment.time !in availability){
        if (appointment.patient.age >= appointment.doctor.smallAge && appointment.patient.age <= appointment.doctor.bigAge){
          this.appointments.push(appointment);
        }else{
          console.log("inappropriate age");
        }}else{
  console.log("the queue is not available");
        }
    }
    viewAllAppointment(): void {
      this.appointments.forEach((appointment) => {
        appointment.getInfo();
      });
    }
    viewAppointmentByDoctorId(id: string): void {
      this.appointments.forEach((appointment) => {
        if (appointment.doctor.getId() === id) {
          appointment.getInfo();
        }
      });
    }
    viewAppointmentByPatientId(id: string): void {
      this.appointments.forEach((appointment) => {
        if (appointment.patient.getId() === id) {
          appointment.getInfo();
        }
      });
    }
    viewAppointmentByDate(date: string): void {
      this.appointments.forEach((appointment) => {
        if (appointment.date === date) {
          appointment.getInfo();
        }
      });
    }
    viewDoctorBySpecialization(special: string): void {
      this.doctors.forEach((doctor) => {
        if (doctor.specialization === special) {
          doctor.getInfo;
        }
      });
    }
    createMedicalRecord(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string;):void{
      const medicReco: MedicalRecord = new MedicalRecord(patient,doctor,diagnosis,prescription);
      this.medicalRecords.push(medicReco);
    }
    viewMedicalRecordByPatient(patientToView:Patient):MedicalRecord[]{
      const PatientsMedicalRecord: MedicalRecord[] = this.medicalRecords.filter(record => record.patient === patientToView)
      return PatientsMedicalRecord;
    }
    getDoctorSchedule(doctor:Doctor,date:string):string[]{
      const schedule: string[] = []
      this.appointments.forEach(appointment => {
        if (appointment.doctor === doctor && appointment.date === date){
          schedule.push(appointment.time)
        }
      })
      return schedule
    }
    getDoctorAvailability(doctor:Doctor,date:string):string[]{
      let availability: string[] = doctor.availability
      this.appointments.forEach(appointment => {
        if (appointment.doctor === doctor && appointment.date === date){
          availability = availability.splice(availability.findIndex(avail => avail === appointment.time),1)
        }
      })
      return availability
    }
  }
  const MS: Patient = new Patient("moshe", "sofer", "1");
  const YL: Patient = new Patient("yakov", "levi", "2");
  const DrAT: Doctor = new Doctor("arik", "tovas", "1", "brine", "");
  const DrBT: Doctor = new Doctor("bob", "tal", "2", "harte");
  const app1: Appointment = new Appointment(MS, DrAT, "1.1.2020", "10:30");
  const app2: Appointment = new Appointment(MS, DrBT, "1.1.2020", "11:30");
  const app3: Appointment = new Appointment(YL, DrAT, "2.1.2020", "10:30");
  const app4: Appointment = new Appointment(YL, DrBT, "2.1.2020", "10:30");
  const Asuta: Hospital = new Hospital(
    [DrAT, DrBT],
    [MS, YL],
    [app1, app2, app3, app4],
    "Asuta"
  );
  const DrMG: Doctor = new Doctor("meny", "gal", "3", "eyes");
  Asuta.addDoctor(DrMG);
  const YY: Patient = new Patient("yosef", "yakobi", "3");
  Asuta.addPatient(YY);
  const app5: Appointment = new Appointment(YY, DrMG, "3.1.2020", "10:30");
  Asuta.addAppointment(app5);