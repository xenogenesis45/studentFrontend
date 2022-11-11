import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

export default function Student() {
    const paperStyle = { padding: '50px', width: 600, margin: "20px auto" }

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const [students, setStudents] = useState([])

    const handleClick = (e) => {
        e.preventDefault();
        const student = { name, address }
        console.log(student)

        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("Nuevo estudiante agregado")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result)
            })
    }, [])


    return (
        <Container>
            <Paper elevatio={3} style={paperStyle}>
                <h1>Añadir estudiante</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, marginTop: "10px" },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth
                        value={name} onChange={(e) => setName(e.target.value)} />

                    <TextField id="outlined-basic" label="Dirección" variant="outlined" fullWidth
                        value={address} onChange={(e) => setAddress(e.target.value)} />

                    <Button variant='contained' color="primary" onClick={handleClick}>Enviar</Button>

                </Box>
                {/* {name}
                {address} */}

                <Paper elevation={3} style={paperStyle}>
                    {students.map(student =>(
                        <Paper elevation={6} style={{margin:"10px", padding:'15px', textAlign:"left"}} key={student.id}>
                            Id:{student.id} <br/>
                            Nombre: {student.name} <br/>
                            Dirección: {student.address} <br/>
                        </Paper>
                    ))}
                </Paper>

            </Paper>
        </Container>

    );
}
