import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "./config";

const Verfication = () => {
    const user = auth.currentUser; 
    if (!user) { //caso ele n esteja registrado
        console.log("Usuario não logado");
        return
    };  const uid = user.uid; //pega o id do usu  
}

//PAGINA VAGAS PARA A PAGINA HOME
const getVagas = async (DadosJobs: any) => {
    const {setJobs, setFilteredJobs, setLoading} =  DadosJobs;
    try {
        const q = query(
        collection(db, "Vagas-trabalho"),
        limit(5) // Limita a 2 resultados
        );
        const querySnapshot = await getDocs(q);
        const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        setJobs(jobsArray);
        setFilteredJobs(jobsArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        setLoading(false);
    }
};

export default getVagas

//DADOS DO USUARIO PAGINA ACCOUNT
export const userData = async (setFilteredUsersData: any, setLoading: any) => {
    const Verfication = () => {
        const user = auth.currentUser; 
        if (!user) { //caso ele n esteja registrado
            console.log("Usuario não logado");
            return
        };  const id = user.uid; //pega o id do usu  
    }
    try {
        const Verfication = () => {
            const user = auth.currentUser; 
            if (!user) { //caso ele n esteja registrado
                console.log("Usuario não logado");
                return
            };  const uid = user.uid; //pega o id do usu  
        }
        const q = query(
        collection(db, "Contas"),
        where("id", "==", Verfication()), // Condição
        );
        const querySnapshot = await getDocs(q);      
        const UsersDataArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setFilteredUsersData(UsersDataArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro vc não esta logado:", error);
    } finally {
        setLoading(false);
    }
}

//GET EMPRESAS NA PAGINA
export const fetchEmpresas = async (setEmpresas: any, setFilteredEmpresas: any, setLoading: any) => {
    try {
        const q = query(
        collection(db, "Contas"),
        where("tipo", "==", "Empresa"), // Condição
        limit(2)
        );
        const querySnapshot = await getDocs(q);      
        const UsersArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        setEmpresas(UsersArray);
        setFilteredEmpresas(UsersArray); // Inicializa com todos os dados
    } catch (error) {
        console.error("Erro ao buscar as vagas:", error);
    } finally {
        setLoading(false);
    }
};