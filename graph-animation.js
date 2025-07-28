document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('graph-container');
    const toggleBtn = document.getElementById('toggle-btn');
    let isExpanded = false;
    let animationFrameId = null;
    const animationDuration = 1000; // 1 second animation
    let animationStartTime = 0;

    // Graph data
    const graphData = {
        nodes: [
            { id: 1, label: 'A', color: '#3498db', size: 30 },
            { id: 2, label: 'B', color: '#e74c3c', size: 30 },
            { id: 3, label: 'C', color: '#2ecc71', size: 30 },
            { id: 4, label: 'D', color: '#f39c12', size: 30 },
            { id: 5, label: 'E', color: '#9b59b6', size: 30 }
        ],
        edges: [
            { source: 1, target: 2, color: '#95a5a6', width: 2 },
            { source: 1, target: 3, color: '#95a5a6', width: 2 },
            { source: 2, target: 4, color: '#95a5a6', width: 2 },
            { source: 3, target: 5, color: '#95a5a6', width: 2 },
            { source: 4, target: 5, color: '#95a5a6', width: 2 }
        ]
    };

    // Calculate final positions in a circle layout
    function calculateFinalPositions() {
        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        const radius = Math.min(container.clientWidth, container.clientHeight) * 0.35;
        
        graphData.nodes.forEach((node, index) => {
            const angle = (index * (2 * Math.PI / graphData.nodes.length)) - Math.PI / 2;
            node.finalX = centerX + radius * Math.cos(angle) - node.size/2;
            node.finalY = centerY + radius * Math.sin(angle) - node.size/2;
        });
    }

    // Create graph elements
    function createGraphElements() {
        // Clear container
        container.innerHTML = '';
        
        // Create edges first (so they appear behind nodes)
        graphData.edges.forEach(edge => {
            const edgeElement = document.createElement('div');
            edgeElement.className = 'edge';
            edgeElement.dataset.source = edge.source;
            edgeElement.dataset.target = edge.target;
            edgeElement.style.backgroundColor = edge.color;
            edgeElement.style.height = `${edge.width}px`;
            edgeElement.style.opacity = '0';
            edgeElement.style.width = '0';
            container.appendChild(edgeElement);
        });
        
        // Create nodes (all stacked at center initially)
        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        
        graphData.nodes.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            nodeElement.textContent = node.label;
            nodeElement.style.backgroundColor = node.color;
            nodeElement.style.width = `${node.size}px`;
            nodeElement.style.height = `${node.size}px`;
            nodeElement.dataset.id = node.id;
            
            // Start at center (stacked)
            nodeElement.style.left = `${centerX - node.size/2}px`;
            nodeElement.style.top = `${centerY - node.size/2}px`;
            nodeElement.style.opacity = '0';
            nodeElement.style.transform = 'scale(0.5)';
            
            container.appendChild(nodeElement);
        });
    }

    // Animation function - fixed edges with correct angles
    function animateGraph(timestamp) {
        if (!animationStartTime) animationStartTime = timestamp;
        const elapsed = timestamp - animationStartTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        const easedProgress = easeOutQuad(progress);
        const animProgress = isExpanded ? easedProgress : 1 - easedProgress;
        
        // Animate nodes
        graphData.nodes.forEach(node => {
            const nodeElement = document.querySelector(`.node[data-id="${node.id}"]`);
            if (nodeElement) {
                const centerX = container.clientWidth / 2 - node.size/2;
                const centerY = container.clientHeight / 2 - node.size/2;
                
                // Interpolate between center and final position
                const currentX = centerX + (node.finalX - centerX) * animProgress;
                const currentY = centerY + (node.finalY - centerY) * animProgress;
                
                // For scale and opacity, we want:
                // Expand: scale 0.5→1, opacity 0→1
                // Collapse: scale 1→0.5, opacity 1→0
                const scale = isExpanded ? 
                    (0.5 + 0.5 * easedProgress) : 
                    (1 - 0.5 * easedProgress);
                
                const opacity = isExpanded ? 
                    easedProgress : 
                    (1 - easedProgress);
                
                nodeElement.style.left = `${currentX}px`;
                nodeElement.style.top = `${currentY}px`;
                nodeElement.style.opacity = opacity.toString();
                nodeElement.style.transform = `scale(${scale})`;
            }
        });
        
        // Animate edges with correct static angles
        graphData.edges.forEach(edge => {
            const edgeElement = document.querySelector(`.edge[data-source="${edge.source}"][data-target="${edge.target}"]`);
            if (edgeElement) {
                const sourceNode = graphData.nodes.find(n => n.id === edge.source);
                const targetNode = graphData.nodes.find(n => n.id === edge.target);
                
                if (sourceNode && targetNode) {
                    // Calculate current positions
                    const sourceX = container.clientWidth/2 - sourceNode.size/2 + 
                                  (sourceNode.finalX - (container.clientWidth/2 - sourceNode.size/2)) * animProgress;
                    const sourceY = container.clientHeight/2 - sourceNode.size/2 + 
                                   (sourceNode.finalY - (container.clientHeight/2 - sourceNode.size/2)) * animProgress;
                    const targetX = container.clientWidth/2 - targetNode.size/2 + 
                                  (targetNode.finalX - (container.clientWidth/2 - targetNode.size/2)) * animProgress;
                    const targetY = container.clientHeight/2 - targetNode.size/2 + 
                                   (targetNode.finalY - (container.clientHeight/2 - targetNode.size/2)) * animProgress;

                    // Calculate final positions for angle calculation
                    const finalSourceX = sourceNode.finalX;
                    const finalSourceY = sourceNode.finalY;
                    const finalTargetX = targetNode.finalX;
                    const finalTargetY = targetNode.finalY;
                    
                    // Calculate angle based on FINAL positions (static angle)
                    const dx = finalTargetX - finalSourceX;
                    const dy = finalTargetY - finalSourceY;
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                    
                    // Calculate current length
                    const currentDx = targetX - sourceX;
                    const currentDy = targetY - sourceY;
                    const length = Math.sqrt(currentDx * currentDy + currentDy * currentDy);
                    
                    // Position edge at source node
                    edgeElement.style.width = `${length}px`;
                    edgeElement.style.left = `${sourceX + sourceNode.size/2}px`;
                    edgeElement.style.top = `${sourceY + sourceNode.size/2}px`;
                    edgeElement.style.transform = `rotate(${angle}deg)`;
                    edgeElement.style.transformOrigin = '0 0';
                    edgeElement.style.opacity = isExpanded ? 
                        (0.7 * easedProgress).toString() : 
                        (0.7 * (1 - easedProgress)).toString();
                }
            }
        });
        
        if (progress < 1) {
            animationFrameId = requestAnimationFrame(animateGraph);
        } else {
            animationFrameId = null;
            animationStartTime = 0;
        }
    }

    // Easing function for smooth animation
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // Toggle graph animation
    function toggleGraph() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        isExpanded = !isExpanded;
        animationStartTime = 0;
        requestAnimationFrame(animateGraph);
    }

    // Initialize
    calculateFinalPositions();
    createGraphElements();

    // Event listener for toggle button
    toggleBtn.addEventListener('click', toggleGraph);

    // Handle window resize
    window.addEventListener('resize', function() {
        calculateFinalPositions();
        if (!isExpanded) return;
        
        // If expanded, update to final positions immediately
        if (!animationFrameId) {
            graphData.nodes.forEach(node => {
                const nodeElement = document.querySelector(`.node[data-id="${node.id}"]`);
                if (nodeElement) {
                    nodeElement.style.left = `${node.finalX}px`;
                    nodeElement.style.top = `${node.finalY}px`;
                    nodeElement.style.opacity = '1';
                    nodeElement.style.transform = 'scale(1)';
                }
            });
            
            // Update edges
            graphData.edges.forEach(edge => {
                const edgeElement = document.querySelector(`.edge[data-source="${edge.source}"][data-target="${edge.target}"]`);
                if (edgeElement) {
                    const sourceNode = graphData.nodes.find(n => n.id === edge.source);
                    const targetNode = graphData.nodes.find(n => n.id === edge.target);
                    
                    if (sourceNode && targetNode) {
                        const dx = targetNode.finalX - sourceNode.finalX;
                        const dy = targetNode.finalY - sourceNode.finalY;
                        const length = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                        
                        edgeElement.style.width = `${length}px`;
                        edgeElement.style.left = `${sourceNode.finalX + sourceNode.size/2}px`;
                        edgeElement.style.top = `${sourceNode.finalY + sourceNode.size/2}px`;
                        edgeElement.style.transform = `rotate(${angle}deg)`;
                        edgeElement.style.opacity = '0.7';
                    }
                }
            });
        }
    });
});