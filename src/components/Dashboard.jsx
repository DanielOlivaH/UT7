import { AppBar, Container, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Grid container spacing={1} sx={{ width: '100%' }}>
                        <Grid size={{xs:12, md:2, lg:2}}>
                            <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Inicio</Link>
                        </Grid>
                        <Grid size={{xs:12, md:2, lg:2}}>
                            <Link to={'/gestos'} style={{textDecoration:'none', color:'white'}}>Gestos</Link>
                        </Grid>
                        <Grid size={{xs:12, md:2, lg:2}}>
                            <Link to={'/vozej1'} style={{textDecoration:'none', color:'white'}}>Voz: ejemplo básico</Link>
                        </Grid>
                        <Grid size={{xs:12, md:2, lg:2}}>
                            <Link to={'/vozej2'} style={{textDecoration:'none', color:'white'}}>Voz: ejemplo comandos</Link>
                        </Grid>
                        <Grid size={{xs:12, md:1, lg:1}}>
                            <Link to={'/ar'} style={{textDecoration:'none', color:'white'}}>AR</Link>
                        </Grid>
                        <Grid size={{xs:12, md:1, lg:1}}>
                            <Link to={'/ARDaniel'} style={{textDecoration:'none', color:'white'}}>AR Modelo</Link>
                        </Grid>
                        <Grid size={{xs:12, md:2, lg:2}}>
                            <Link to={'/VozTarea2'} style={{textDecoration:'none', color:'white'}}>Voz: Tarea 2</Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Dashboard;