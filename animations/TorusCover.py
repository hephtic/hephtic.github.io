from manim import *
import numpy as np

class TorusCover(ThreeDScene):
    def construct(self):
        # Title
        title = MathTex(r"\mathbb{R}^2 \to T^2: (x,y) \mapsto (e^{ix}, e^{iy})").to_edge(UP)
        self.add_fixed_in_frame_mobjects(title)
        self.play(Write(title))

        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES, zoom=0.8)

        # 1. Create the infinite plane with grid
        plane = NumberPlane(
            x_range=[-4*PI, 4*PI, PI/2],
            y_range=[-4*PI, 4*PI, PI/2],
            x_length=10,
            y_length=10,
            background_line_style={"stroke_opacity": 0.3, "stroke_width": 1},
            axis_config={"stroke_opacity": 0.5}
        ).shift(LEFT * 4)

        # Highlight the fundamental domain boundaries
        vertical_lines = VGroup()
        horizontal_lines = VGroup()
        for i in range(-1, 2):
            v_line = Line(
                plane.c2p(2*PI*i, -3*PI), 
                plane.c2p(2*PI*i, 3*PI), 
                color=YELLOW, 
                stroke_width=3
            )
            h_line = Line(
                plane.c2p(-3*PI, 2*PI*i), 
                plane.c2p(3*PI, 2*PI*i), 
                color=YELLOW, 
                stroke_width=3
            )
            vertical_lines.add(v_line)
            horizontal_lines.add(h_line)

        self.play(Create(plane))
        self.play(Create(vertical_lines), Create(horizontal_lines))

        # Label for the plane
        plane_label = Tex(r"$\mathbb{R}^2$ (Universal Cover)").scale(0.7)
        self.add_fixed_in_frame_mobjects(plane_label)
        plane_label.to_corner(UL)
        self.play(FadeIn(plane_label))
        self.wait(1)

        # 2. Create the torus
        def torus_func(u, v):
            major_radius = 1.5
            minor_radius = 0.5
            return np.array([
                (major_radius + minor_radius * np.cos(v)) * np.cos(u),
                (major_radius + minor_radius * np.cos(v)) * np.sin(u),
                minor_radius * np.sin(v)
            ])

        torus = Surface(
            torus_func,
            u_range=[0, 2*PI],
            v_range=[0, 2*PI],
            resolution=(40, 40),
            fill_opacity=0.7,
            fill_color=BLUE_D,
            stroke_color=BLUE_E,
            stroke_width=0.5
        ).shift(RIGHT * 6, DOWN * 0.6)

        self.play(Create(torus))
        
        # Label for the torus
        torus_label = Tex(r"$T^2$ (Torus)").scale(0.7)
        self.add_fixed_in_frame_mobjects(torus_label)
        torus_label.to_corner(UR)
        self.play(FadeIn(torus_label))
        self.wait(1)

        # 3. Show the covering map with multiple paths
        covering_text = Tex("Each point on torus corresponds to\\\\infinitely many points on plane").scale(0.6)
        self.add_fixed_in_frame_mobjects(covering_text)
        covering_text.to_edge(DOWN)
        self.play(FadeIn(covering_text))

        # Create several paths on the plane that map to the same path on torus
        def create_plane_path(shift_x=0, shift_y=0, color=RED):
            return ParametricFunction(
                lambda t: plane.c2p(
                    2*PI*shift_x + 1.2*np.cos(3*t), 
                    2*PI*shift_y + 1.2*np.sin(2*t)
                ),
                t_range=[0, 2*PI],
                stroke_color=color,
                stroke_width=4
            )

        # Create the corresponding single path on torus
        def torus_path_func(t):
            u = 1.2*np.cos(3*t)
            v = 1.2*np.sin(2*t) 
            return torus_func(u, v)

        torus_path = ParametricFunction(
            torus_path_func,
            t_range=[0, 2*PI],
            stroke_color=RED,
            stroke_width=6
        ).shift(RIGHT * 6, DOWN * 0.6)

        # Create multiple plane paths (different fundamental domains)
        plane_paths = VGroup()
        colors = [RED, GREEN, PURPLE, ORANGE]
        shifts = [(0,0), (1,0), (0,1), (-1,-1)]
        
        for i, ((sx, sy), color) in enumerate(zip(shifts, colors)):
            path = create_plane_path(sx, sy, color)
            plane_paths.add(path)

        # Show all plane paths and the single torus path
        self.play(
            *[Create(path) for path in plane_paths],
            Create(torus_path)
        )
        self.wait(2)

        # 4. Animate dots moving along paths to show the covering
        dots_plane = VGroup()
        for path, color in zip(plane_paths, colors):
            dot = Dot(color=color, radius=0.06)
            dots_plane.add(dot)

        dot_torus = Dot(color=RED, radius=0.08).move_to(torus_path.get_start())

        self.play(*[FadeIn(dot) for dot in dots_plane], FadeIn(dot_torus))

        # Animate all dots simultaneously
        animations = []
        for dot, path in zip(dots_plane, plane_paths):
            animations.append(MoveAlongPath(dot, path))
        animations.append(MoveAlongPath(dot_torus, torus_path))

        self.play(*animations, run_time=8, rate_func=linear)
        self.wait(1)

        # 5. Show fundamental domain more clearly
        self.play(
            FadeOut(covering_text),
            *[FadeOut(dot) for dot in dots_plane],
            FadeOut(dot_torus),
            *[FadeOut(path) for path in plane_paths[1:]], # Keep only one path
            FadeOut(torus_path)
        )

        # Highlight one fundamental domain
        fund_domain = Rectangle(
            width=2.25, 
            height=2.25,
            stroke_color=YELLOW, 
            stroke_width=5,
            fill_color=YELLOW,
            fill_opacity=0.2
        ).move_to(plane.c2p(PI, PI))

        fund_text = Tex("Fundamental Domain\\\\$[0, 2\\pi] \\times [0, 2\\pi]$").scale(0.6)
        self.add_fixed_in_frame_mobjects(fund_text)
        fund_text.to_edge(DOWN)

        self.play(
            Create(fund_domain),
            FadeIn(fund_text)
        )
        self.wait(2)

        # 6. Show morphing animation from fundamental domain to torus
        self.play(
            FadeOut(fund_text),
            *[FadeOut(path) for path in plane_paths], # Remove remaining paths
        )

        # Create a copy of the fundamental domain for morphing
        morphing_domain = fund_domain.copy()
        
        morph_text = Tex("Watch the fundamental domain\\\\transform into the torus").scale(0.6)
        self.add_fixed_in_frame_mobjects(morph_text)
        morph_text.to_edge(DOWN)
        self.play(FadeIn(morph_text))

        # Move the morphing domain to center stage
        self.play(
            morphing_domain.animate.move_to(RIGHT*2, UP*1).scale(1),
            run_time=2
        )
        self.wait(1)

        # Create intermediate surfaces that morph from rectangle to torus
        def morphing_surface(alpha):
            """Create a surface that interpolates between flat rectangle and torus"""
            def surface_func(u, v):
                # u and v go from 0 to 2π
                # For rectangle: just return flat coordinates
                # For torus: use torus parameterization
                
                if alpha == 0:
                    # Flat rectangle
                    return np.array([
                        (u - PI) * 0.8,  # Scale down to fit
                        (v - PI) * 0.8,
                        0
                    ])
                else:
                    # Interpolate towards torus
                    major_radius = 1.5 * alpha
                    minor_radius = 0.5 * alpha
                    
                    # Flat component (decreasing)
                    flat_x = (1 - alpha) * (u - PI) * 0.8
                    flat_y = (1 - alpha) * (v - PI) * 0.8
                    flat_z = 0
                    
                    # Torus component (increasing)
                    torus_x = alpha * (major_radius + minor_radius * np.cos(v)) * np.cos(u)
                    torus_y = alpha * (major_radius + minor_radius * np.cos(v)) * np.sin(u)
                    torus_z = alpha * minor_radius * np.sin(v)
                    
                    return np.array([
                        flat_x + torus_x,
                        flat_y + torus_y, 
                        flat_z + torus_z
                    ])
            
            return Surface(
                surface_func,
                u_range=[0, 2*PI],
                v_range=[0, 2*PI],
                resolution=(25, 25),
                fill_opacity=0.8,
                fill_color=interpolate_color(YELLOW, BLUE_D, alpha),
                stroke_color=interpolate_color(YELLOW, BLUE_E, alpha),
                stroke_width=1
            ).shift(RIGHT * 6, DOWN * 0.6) 

        # Animate the morphing in steps
        morphing_steps = [0.2, 0.4, 0.6, 0.8, 1.0]
        
        for i, alpha in enumerate(morphing_steps):
            target_surface = morphing_surface(alpha)
            
            if i == 0:
                # First transformation from rectangle
                initial_surface = morphing_surface(0)
                self.play(
                    Transform(morphing_domain, initial_surface),
                    run_time=1
                )
                self.play(
                    Transform(morphing_domain, target_surface),
                    run_time=1.5
                )
            else:
                self.play(
                    Transform(morphing_domain, target_surface),
                    run_time=1.5
                )
                
        self.wait(2)
                
        # Fade it away after 2 seconds
        self.play(FadeOut(morphing_domain), run_time=1)

        # Show both the morphed surface and original torus
        comparison_text = Tex("Same topology!").scale(0.8)
        self.add_fixed_in_frame_mobjects(comparison_text)
        comparison_text.to_edge(DOWN)
        
        self.play(
            FadeOut(morph_text),
            FadeIn(comparison_text),
            torus.animate.set_fill(opacity=0.9).set_color(GREEN_D)
        )
        self.wait(2)

        # 7. Show the covering relationship with connecting lines
        self.play(FadeOut(comparison_text))
        
        # Create several points on the fundamental domain and show where they map
        sample_points_plane = [
            plane.c2p(PI/2, PI/2),
            plane.c2p(3*PI/2, PI/2), 
            plane.c2p(PI/2, 3*PI/2),
            plane.c2p(3*PI/2, 3*PI/2)
        ]
        
        # Corresponding points on torus
        sample_coords = [(PI/2, PI/2), (3*PI/2, PI/2), (PI/2, 3*PI/2), (3*PI/2, 3*PI/2)]
        sample_points_torus = []
        for u, v in sample_coords:
            point = torus_func(u, v)
            sample_points_torus.append(point + RIGHT * 6 + DOWN * 0.6)

        # Create dots and connecting lines
        plane_dots = VGroup(*[Dot(point, color=RED, radius=0.08) for point in sample_points_plane])
        torus_dots = VGroup(*[Dot(point, color=RED, radius=0.08) for point in sample_points_torus])
        
        connecting_lines = VGroup()
        for p_plane, p_torus in zip(sample_points_plane, sample_points_torus):
            line = DashedLine(p_plane, p_torus, color=WHITE, stroke_width=2)
            connecting_lines.add(line)

        covering_demo_text = Tex("Points on plane map to torus\\\\via the covering map").scale(0.6)
        self.add_fixed_in_frame_mobjects(covering_demo_text)
        covering_demo_text.to_edge(DOWN)

        self.play(
            FadeIn(plane_dots),
            FadeIn(torus_dots),
            Create(connecting_lines),
            FadeIn(covering_demo_text)
        )
        self.wait(3)

        # 8. Final summary
        self.play(
            FadeOut(covering_demo_text),
            FadeOut(plane_dots),
            FadeOut(torus_dots), 
            FadeOut(connecting_lines)
        )

        summary = Tex(
            "The plane $\\mathbb{R}^2$ is the universal covering space\\\\of the torus $T^2$"
        ).scale(0.7)
        self.add_fixed_in_frame_mobjects(summary)
        summary.to_edge(DOWN)

        self.play(FadeIn(summary))
        self.wait(3)