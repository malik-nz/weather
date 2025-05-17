import { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';


export default function IoTMap({ networkData }: any) {
    const [selectedNode, setSelectedNode] = useState(null);
    return (
        <div className="bg-dark min-vh-100  w-100 py-5">
            <motion.div
                className="container mt-4 p-4 bg-dark bg-opacity-75 rounded text-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="mb-3">IoT Weather</h3>
                <div style={{ height: '575px' }} className="border rounded overflow-hidden">
                    <MapContainer center={[20, 0]} zoom={3} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='© <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        {networkData.map((node: any) => {
                            if (!node.city) return
                            const now: any = new Date();
                            const nodeTime: any = new Date(node.time);
                            const freshness = Math.floor((now - nodeTime) / 1000);
                            return (
                                <Circle
                                    key={node.city}
                                    center={[node.latitude, node.longitude]}
                                    radius={50000}
                                    pathOptions={{
                                        color: freshness <= 120 ? "lime" : "red",
                                        fillColor: freshness <= 120 ? "lime" : "red",
                                        fillOpacity: 0.5,
                                    }}
                                    eventHandlers={{
                                        click: () => setSelectedNode(node),
                                    }}
                                >
                                    <Popup>
                                        <div>
                                            <h5>{node.city}</h5>
                                            <p><strong>Status:</strong> <span className={freshness <= 120 ? "text-success" : "text-danger"}>{freshness <= 120 ? "Online" : "Offline"}</span></p>
                                            <p><strong>Sensor ID:</strong> {node.p_id ? node.p_id.replace("id_", "") : ""}</p>
                                            <p><strong>Freshness:</strong> {freshness}</p>
                                            <p><strong>Temperature:</strong> {node.temp ?? "N/A"}°C</p>
                                            <p><strong>Humidity:</strong> {node.humidity ?? "N/A"}%</p>
                                            <p className="fst-italic">{node.recommendation}</p>
                                            <button
                                                className="btn btn-sm btn-outline-info mt-2"
                                                onClick={() => setSelectedNode(node)}
                                            >
                                                View More
                                            </button>
                                        </div>
                                    </Popup>
                                </Circle>
                            )
                        }
                        )}
                    </MapContainer>
                </div>

                {selectedNode && (
                    <motion.div
                        className="card bg-light text-dark mt-4"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{selectedNode.city} - Detailed Info</h5>
                            <p className="card-text"><strong>Temperature:</strong> {selectedNode.temp ?? 'N/A'}°C</p>
                            <p className="card-text"><strong>Humidity:</strong> {selectedNode.humidity ?? 'N/A'}%</p>
                            {/* <p className="card-text"><strong>Recommendation:</strong> {selectedNode.recommendation}</p> */}
                            <button className="btn btn-sm btn-danger" onClick={() => setSelectedNode(null)}>
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
